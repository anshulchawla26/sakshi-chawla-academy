#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build a premium, production-ready website for "Sakshi Chawla Academy" with Next.js,
  Tailwind, Framer Motion and Sanity CMS. All content must be editable from an embedded
  Sanity Studio at /studio. Includes Hero, About, Meet Teacher, Courses (Class 9, Class 10,
  Online Vedic Maths), Why Choose Us, Learning Process, Statistics, Student Results,
  Gallery with lightbox, Testimonials, Google Reviews, FAQ, Contact form + Google Maps,
  Footer, Floating Buttons and Mobile Bottom Nav. Design: navy #0F4C81 primary, orange
  #F59E0B accent, Playfair Display + Inter typography, glass cards, smooth animations.

backend:
  - task: "Enquiry API + MongoDB persistence"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "POST /api/enquiry saves {name, phone, email, studentClass, message} to MongoDB collection 'enquiries'. Manually verified with curl returning {ok:true,id:...}."

  - task: "Sanity CMS integration (client + Studio embed)"
    implemented: true
    working: true
    file: "/app/sanity.config.js, /app/lib/sanity/*"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Sanity Studio embedded at /studio route. Loads and correctly prompts user to add CORS origin (expected first-time behaviour). Homepage falls back to premium placeholder content when dataset is empty, then instantly picks up any CMS content once published."

frontend:
  - task: "Premium homepage with all sections"
    implemented: true
    working: true
    file: "/app/app/page.js and /app/components/sections/*"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "All 13 sections render. Screenshots verified hero, courses, why-choose-us + timeline, and gallery look premium. Not yet tested with Playwright automation."

  - task: "Fix: metadata export from use client component (Sanity Studio embed)"
    implemented: true
    working: true
    file: "/app/app/studio/[[...tool]]/page.jsx, /app/app/studio/layout.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Refactored: page.jsx keeps 'use client' + NextStudio only; layout.jsx (server component, no 'use client') exports { metadata, viewport } from 'next-sanity/studio'. Verified production build: 'yarn build' completes with ✓ Compiled successfully and generates all 4 pages including /studio/[[...tool]] with zero errors. Needs testing agent verification: (1) production build has zero errors, (2) /studio route loads without runtime errors, (3) / homepage still renders correctly with all sections, (4) no browser console errors related to 'use client' metadata."
      - working: true
        agent: "testing"
        comment: "VERIFIED - Bug fix completely resolved. Build test: Exit code 0, compiled successfully in 14.3s, all 4 pages generated with ZERO metadata/use client errors. Homepage runtime: HTTP 200, hero section 'Build Strong Concepts.' renders, all sections (Courses, Why Us, Gallery, FAQ, Contact) visible, navbar with 'Sakshi Chawla' branding present, NO console errors related to metadata/use client. Sanity Studio runtime: HTTP 200, CORS setup prompt displays (expected behavior), NO console errors related to metadata/use client. Regression test: Enquiry modal opens successfully. The Next.js 'metadata from use client component' build error is COMPLETELY RESOLVED."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 0
  run_ui: false

test_plan:
  current_focus:
    - "Enquiry API + MongoDB persistence"
    - "Sanity CMS integration (client + Studio embed)"
    - "Premium homepage with all sections"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "MVP delivered. Homepage live, Sanity Studio embedded and functional (needs CORS origin added by user in Sanity dashboard). Enquiry form persists to MongoDB. Placeholder content shows automatically until CMS is populated."
  - agent: "testing"
    message: "Bug fix verification complete. The Next.js 'metadata from use client component' build error is COMPLETELY RESOLVED. All 4 test areas passed: (1) Build completes with exit code 0 and zero errors, (2) Homepage renders correctly with all sections, (3) Sanity Studio loads with CORS prompt (expected), (4) Enquiry modal works (no regression). No metadata/use client console errors detected. Ready for production."
