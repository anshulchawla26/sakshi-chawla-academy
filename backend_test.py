#!/usr/bin/env python3
"""
Production Readiness Hardening Test Suite
Tests security headers, rate limiting, input validation, honeypot, admin auth, and error pages
"""

import requests
import time
import json
from typing import Dict, List, Tuple

BASE_URL = "http://localhost:3000"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

def print_section(title: str):
    print(f"\n{'='*80}")
    print(f"{Colors.BLUE}{title}{Colors.RESET}")
    print(f"{'='*80}")

def print_pass(msg: str):
    print(f"{Colors.GREEN}✓ PASS:{Colors.RESET} {msg}")

def print_fail(msg: str):
    print(f"{Colors.RED}✗ FAIL:{Colors.RESET} {msg}")

def print_info(msg: str):
    print(f"{Colors.YELLOW}ℹ INFO:{Colors.RESET} {msg}")

# ============================================================================
# SECTION A: Security Headers
# ============================================================================

def test_security_headers():
    print_section("SECTION A: Security Headers")
    
    tests = [
        {
            "name": "Homepage (/)",
            "url": "/",
            "required_headers": {
                "X-Content-Type-Options": "nosniff",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
                "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
                "X-XSS-Protection": "1; mode=block",
                "X-DNS-Prefetch-Control": "on",
            },
            "forbidden_headers": ["X-Powered-By"]
        },
        {
            "name": "API Health (/api/health)",
            "url": "/api/health",
            "required_headers": {
                "X-Content-Type-Options": "nosniff",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "Cache-Control": "no-store, must-revalidate",
                "X-Robots-Tag": "noindex, nofollow",
            },
            "forbidden_headers": ["X-Powered-By"]
        },
        {
            "name": "Studio (/studio)",
            "url": "/studio",
            "required_headers": {
                "X-Robots-Tag": "noindex, nofollow",
                "X-Content-Type-Options": "nosniff",
            }
        }
    ]
    
    results = []
    for test in tests:
        print(f"\n{test['name']}:")
        try:
            resp = requests.head(f"{BASE_URL}{test['url']}", timeout=10)
            print_info(f"Status: {resp.status_code}")
            
            # Check required headers
            all_pass = True
            for header, expected_value in test.get('required_headers', {}).items():
                actual = resp.headers.get(header, '')
                if expected_value.lower() in actual.lower():
                    print_pass(f"{header}: {actual}")
                else:
                    print_fail(f"{header}: Expected '{expected_value}', got '{actual}'")
                    all_pass = False
            
            # Check forbidden headers
            for header in test.get('forbidden_headers', []):
                if header in resp.headers:
                    print_fail(f"{header} should not be present, but found: {resp.headers[header]}")
                    all_pass = False
                else:
                    print_pass(f"{header} correctly absent")
            
            results.append(("PASS" if all_pass else "FAIL", test['name']))
        except Exception as e:
            print_fail(f"Request failed: {e}")
            results.append(("FAIL", test['name']))
    
    # Test static assets caching
    print(f"\nStatic Assets (/_next/static/*):")
    try:
        # Get homepage HTML to find a static asset URL
        resp = requests.get(f"{BASE_URL}/", timeout=10)
        html = resp.text
        # Look for /_next/static/ URLs
        import re
        static_urls = re.findall(r'/_next/static/[^"\']+', html)
        if static_urls:
            static_url = static_urls[0]
            print_info(f"Testing: {static_url}")
            resp = requests.head(f"{BASE_URL}{static_url}", timeout=10)
            cache_control = resp.headers.get('Cache-Control', '')
            if 'public' in cache_control and 'max-age=31536000' in cache_control and 'immutable' in cache_control:
                print_pass(f"Cache-Control: {cache_control}")
                results.append(("PASS", "Static assets caching"))
            else:
                print_fail(f"Cache-Control: Expected 'public, max-age=31536000, immutable', got '{cache_control}'")
                results.append(("FAIL", "Static assets caching"))
        else:
            print_info("No static assets found in HTML")
            results.append(("SKIP", "Static assets caching"))
    except Exception as e:
        print_fail(f"Static assets test failed: {e}")
        results.append(("FAIL", "Static assets caching"))
    
    return results

# ============================================================================
# SECTION B: API Enquiry Validation
# ============================================================================

def test_enquiry_validation():
    print_section("SECTION B: API Enquiry Validation")
    
    tests = [
        {
            "name": "Empty body",
            "body": {},
            "expected_status": 400,
            "expected_error": "Please provide a valid name"
        },
        {
            "name": "Name too short",
            "body": {"name": "X"},
            "expected_status": 400,
            "expected_error": "Please provide a valid name"
        },
        {
            "name": "Missing phone",
            "body": {"name": "Ravi"},
            "expected_status": 400,
            "expected_error": "Please provide a valid phone"
        },
        {
            "name": "Invalid phone",
            "body": {"name": "Ravi", "phone": "abc"},
            "expected_status": 400,
            "expected_error": "Please provide a valid phone"
        },
        {
            "name": "Invalid email",
            "body": {"name": "Ravi", "phone": "+919876543210", "email": "not-an-email"},
            "expected_status": 400,
            "expected_error": "Please provide a valid email"
        },
        {
            "name": "Valid enquiry",
            "body": {"name": "Ravi Kumar", "phone": "+919876543210", "email": "ravi@test.com", "message": "Interested in Class 10 coaching"},
            "expected_status": 200,
            "expected_response": {"ok": True}
        },
        {
            "name": "Script tags in name/message",
            "body": {"name": "Ravi<script>alert('xss')</script>", "phone": "+919876543210", "message": "<script>alert('xss')</script>Interested"},
            "expected_status": 200,
            "expected_response": {"ok": True}
        },
        {
            "name": "Honeypot field (bot detection)",
            "body": {"name": "Bot User", "phone": "+919876543210", "website": "http://spam.com"},
            "expected_status": 200,
            "expected_response": {"ok": True},
            "should_not_save": True
        }
    ]
    
    results = []
    for test in tests:
        print(f"\n{test['name']}:")
        try:
            resp = requests.post(
                f"{BASE_URL}/api/enquiry",
                json=test['body'],
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            print_info(f"Status: {resp.status_code}")
            print_info(f"Response: {resp.text[:200]}")
            
            if resp.status_code == test['expected_status']:
                print_pass(f"Status code matches: {resp.status_code}")
                
                if 'expected_error' in test:
                    if test['expected_error'].lower() in resp.text.lower():
                        print_pass(f"Error message contains: '{test['expected_error']}'")
                        results.append(("PASS", test['name']))
                    else:
                        print_fail(f"Error message doesn't contain: '{test['expected_error']}'")
                        results.append(("FAIL", test['name']))
                elif 'expected_response' in test:
                    data = resp.json()
                    if data.get('ok') == test['expected_response'].get('ok'):
                        print_pass(f"Response matches expected")
                        
                        # Check honeypot - should not save to DB
                        if test.get('should_not_save'):
                            print_info("Honeypot test - bot submission should be silently dropped")
                        
                        results.append(("PASS", test['name']))
                    else:
                        print_fail(f"Response doesn't match expected")
                        results.append(("FAIL", test['name']))
            else:
                print_fail(f"Status code mismatch: expected {test['expected_status']}, got {resp.status_code}")
                results.append(("FAIL", test['name']))
        except Exception as e:
            print_fail(f"Request failed: {e}")
            results.append(("FAIL", test['name']))
    
    return results

# ============================================================================
# SECTION C: Rate Limiting
# ============================================================================

def test_rate_limiting():
    print_section("SECTION C: Rate Limiting")
    
    print_info("Restarting nextjs to clear in-memory rate limiter...")
    import subprocess
    subprocess.run(["sudo", "supervisorctl", "restart", "nextjs"], capture_output=True)
    time.sleep(3)
    
    print_info("Sending 12 rapid POST requests to /api/enquiry...")
    
    results = []
    success_count = 0
    rate_limited_count = 0
    
    for i in range(12):
        try:
            resp = requests.post(
                f"{BASE_URL}/api/enquiry",
                json={"name": f"Test User {i}", "phone": "+919876543210"},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if resp.status_code == 200 or resp.status_code == 400:
                success_count += 1
                print_info(f"Request {i+1}: {resp.status_code} (allowed)")
            elif resp.status_code == 429:
                rate_limited_count += 1
                data = resp.json()
                print_info(f"Request {i+1}: 429 (rate limited) - {data.get('error', '')}")
            else:
                print_info(f"Request {i+1}: {resp.status_code}")
        except Exception as e:
            print_fail(f"Request {i+1} failed: {e}")
    
    print(f"\nSummary:")
    print_info(f"Allowed requests: {success_count}")
    print_info(f"Rate limited requests: {rate_limited_count}")
    
    # First ~8 should succeed, rest should be rate limited
    if success_count <= 8 and rate_limited_count >= 4:
        print_pass("Rate limiting working correctly (first ~8 allowed, rest blocked)")
        results.append(("PASS", "Rate limiting"))
    else:
        print_fail(f"Rate limiting not working as expected (expected ~8 allowed, ~4 blocked)")
        results.append(("FAIL", "Rate limiting"))
    
    return results

# ============================================================================
# SECTION D: Admin Endpoint Protection
# ============================================================================

def test_admin_protection():
    print_section("SECTION D: Admin Endpoint Protection")
    
    tests = [
        {
            "name": "No token",
            "headers": {},
            "params": {},
            "expected_status": 401
        },
        {
            "name": "Wrong token in query",
            "headers": {},
            "params": {"token": "wrong"},
            "expected_status": 401
        },
        {
            "name": "Wrong token in header",
            "headers": {"x-admin-token": "wrong"},
            "params": {},
            "expected_status": 401
        }
    ]
    
    results = []
    for test in tests:
        print(f"\n{test['name']}:")
        try:
            resp = requests.get(
                f"{BASE_URL}/api/enquiries",
                headers=test['headers'],
                params=test['params'],
                timeout=10
            )
            print_info(f"Status: {resp.status_code}")
            print_info(f"Response: {resp.text[:200]}")
            
            if resp.status_code == test['expected_status']:
                print_pass(f"Status code matches: {resp.status_code}")
                if 'Unauthorized' in resp.text or 'unauthorized' in resp.text.lower():
                    print_pass("Response contains 'Unauthorized'")
                    results.append(("PASS", test['name']))
                else:
                    print_fail("Response doesn't contain 'Unauthorized'")
                    results.append(("FAIL", test['name']))
            else:
                print_fail(f"Status code mismatch: expected {test['expected_status']}, got {resp.status_code}")
                results.append(("FAIL", test['name']))
        except Exception as e:
            print_fail(f"Request failed: {e}")
            results.append(("FAIL", test['name']))
    
    print_info("\nNote: ADMIN_TOKEN env var is not set, so all requests should return 401")
    
    return results

# ============================================================================
# SECTION E: Health Endpoint
# ============================================================================

def test_health_endpoint():
    print_section("SECTION E: Health Endpoint")
    
    results = []
    try:
        resp = requests.get(f"{BASE_URL}/api/health", timeout=10)
        print_info(f"Status: {resp.status_code}")
        print_info(f"Response: {resp.text}")
        
        if resp.status_code == 200:
            print_pass("Status code is 200")
            data = resp.json()
            if data.get('ok') == True and 'ts' in data:
                print_pass(f"Response contains ok:true and ts:{data['ts']}")
                results.append(("PASS", "Health endpoint"))
            else:
                print_fail("Response doesn't match expected format")
                results.append(("FAIL", "Health endpoint"))
        else:
            print_fail(f"Status code is {resp.status_code}, expected 200")
            results.append(("FAIL", "Health endpoint"))
    except Exception as e:
        print_fail(f"Request failed: {e}")
        results.append(("FAIL", "Health endpoint"))
    
    return results

# ============================================================================
# SECTION F: New Pages
# ============================================================================

def test_new_pages():
    print_section("SECTION F: New Pages")
    
    tests = [
        {
            "name": "manifest.webmanifest",
            "url": "/manifest.webmanifest",
            "expected_status": 200,
            "expected_content": ["Sakshi Chawla Academy", "#0F4C81"]
        },
        {
            "name": "robots.txt",
            "url": "/robots.txt",
            "expected_status": 200,
            "expected_content": ["Disallow: /studio/", "Disallow: /api/", "Sitemap:"]
        },
        {
            "name": "sitemap.xml",
            "url": "/sitemap.xml",
            "expected_status": 200,
            "expected_content": ["<urlset", "<url>", "<loc>"]
        },
        {
            "name": "404 page",
            "url": "/nonexistent-page-xyz",
            "expected_status": 404,
            "expected_content": ["Page not found", "Go home"]
        }
    ]
    
    results = []
    for test in tests:
        print(f"\n{test['name']}:")
        try:
            resp = requests.get(f"{BASE_URL}{test['url']}", timeout=10)
            print_info(f"Status: {resp.status_code}")
            
            if resp.status_code == test['expected_status']:
                print_pass(f"Status code matches: {resp.status_code}")
                
                all_found = True
                for content in test['expected_content']:
                    if content in resp.text:
                        print_pass(f"Contains: '{content}'")
                    else:
                        print_fail(f"Missing: '{content}'")
                        all_found = False
                
                if all_found:
                    results.append(("PASS", test['name']))
                else:
                    results.append(("FAIL", test['name']))
            else:
                print_fail(f"Status code mismatch: expected {test['expected_status']}, got {resp.status_code}")
                results.append(("FAIL", test['name']))
        except Exception as e:
            print_fail(f"Request failed: {e}")
            results.append(("FAIL", test['name']))
    
    return results

# ============================================================================
# SECTION G: Production Build
# ============================================================================

def test_production_build():
    print_section("SECTION G: Production Build")
    
    print_info("Running production build...")
    import subprocess
    
    results = []
    try:
        result = subprocess.run(
            ["bash", "-c", "cd /app && rm -rf .next && NODE_OPTIONS='--max-old-space-size=4096' yarn build 2>&1 | tail -30"],
            capture_output=True,
            text=True,
            timeout=300
        )
        
        print_info(f"Exit code: {result.returncode}")
        print(result.stdout)
        
        if result.returncode == 0:
            print_pass("Build exit code is 0")
            if "Compiled successfully" in result.stdout or "✓ Compiled" in result.stdout:
                print_pass("Build compiled successfully")
                results.append(("PASS", "Production build"))
            else:
                print_fail("Build output doesn't contain 'Compiled successfully'")
                results.append(("FAIL", "Production build"))
        else:
            print_fail(f"Build failed with exit code {result.returncode}")
            results.append(("FAIL", "Production build"))
        
        # Restart nextjs after build
        print_info("Restarting nextjs service...")
        subprocess.run(["sudo", "supervisorctl", "restart", "nextjs"], capture_output=True)
        time.sleep(3)
        
    except Exception as e:
        print_fail(f"Build test failed: {e}")
        results.append(("FAIL", "Production build"))
    
    return results

# ============================================================================
# SECTION H: Homepage Regression
# ============================================================================

def test_homepage_regression():
    print_section("SECTION H: Homepage Regression")
    
    results = []
    try:
        resp = requests.get(f"{BASE_URL}/", timeout=10)
        print_info(f"Status: {resp.status_code}")
        
        if resp.status_code == 200:
            print_pass("Status code is 200")
            
            required_content = ["Sakshi Chawla", "Build Strong Concepts"]
            all_found = True
            for content in required_content:
                if content in resp.text:
                    print_pass(f"Contains: '{content}'")
                else:
                    print_fail(f"Missing: '{content}'")
                    all_found = False
            
            if all_found:
                results.append(("PASS", "Homepage regression"))
            else:
                results.append(("FAIL", "Homepage regression"))
        else:
            print_fail(f"Status code is {resp.status_code}, expected 200")
            results.append(("FAIL", "Homepage regression"))
    except Exception as e:
        print_fail(f"Request failed: {e}")
        results.append(("FAIL", "Homepage regression"))
    
    return results

# ============================================================================
# MAIN
# ============================================================================

def main():
    print(f"\n{Colors.BLUE}{'='*80}")
    print("Production Readiness Hardening Test Suite")
    print("Sakshi Chawla Academy Backend API + Next.js Configuration")
    print(f"{'='*80}{Colors.RESET}\n")
    
    all_results = []
    
    # Run all test sections
    all_results.extend(test_security_headers())
    all_results.extend(test_enquiry_validation())
    all_results.extend(test_rate_limiting())
    all_results.extend(test_admin_protection())
    all_results.extend(test_health_endpoint())
    all_results.extend(test_new_pages())
    all_results.extend(test_production_build())
    all_results.extend(test_homepage_regression())
    
    # Print summary
    print_section("FINAL SUMMARY")
    
    pass_count = sum(1 for status, _ in all_results if status == "PASS")
    fail_count = sum(1 for status, _ in all_results if status == "FAIL")
    skip_count = sum(1 for status, _ in all_results if status == "SKIP")
    total_count = len(all_results)
    
    print(f"\nTotal tests: {total_count}")
    print(f"{Colors.GREEN}Passed: {pass_count}{Colors.RESET}")
    print(f"{Colors.RED}Failed: {fail_count}{Colors.RESET}")
    if skip_count > 0:
        print(f"{Colors.YELLOW}Skipped: {skip_count}{Colors.RESET}")
    
    print("\nDetailed Results:")
    for status, name in all_results:
        if status == "PASS":
            print(f"{Colors.GREEN}✓ PASS:{Colors.RESET} {name}")
        elif status == "FAIL":
            print(f"{Colors.RED}✗ FAIL:{Colors.RESET} {name}")
        else:
            print(f"{Colors.YELLOW}⊘ SKIP:{Colors.RESET} {name}")
    
    print(f"\n{'='*80}")
    if fail_count == 0:
        print(f"{Colors.GREEN}✓ ALL TESTS PASSED - PRODUCTION READY{Colors.RESET}")
    else:
        print(f"{Colors.RED}✗ {fail_count} TEST(S) FAILED - NEEDS ATTENTION{Colors.RESET}")
    print(f"{'='*80}\n")
    
    return 0 if fail_count == 0 else 1

if __name__ == "__main__":
    exit(main())
