# Prompt Collections for Rapid Prototyping

This document defines **prompt collections**: curated sets of instructions that guide the LLM's behavior in specific contexts. Each collection ensures consistent decisions, coding style, and delivery practices across different types of projects and development phases.

---

## The Philosophy of Prompt Collections

Prompt collections are the **DNA of consistent development**. They encode the accumulated wisdom of successful projects into reusable patterns that ensure:

- **Predictable Quality**: Every project follows proven patterns
- **Rapid Onboarding**: New team members can immediately contribute effectively  
- **Scalable Practices**: What works for prototypes scales to production
- **Knowledge Preservation**: Best practices don't get lost between projects

Each collection is a **living document** that evolves as we learn what works, what doesn't, and what could work better.

---

### Rapid Prototyping Prompts

#### Adding New Abilities
**Prompt**: "Propose a new Ability under the correct AreaPath. Ensure it is 1–3 days of work and outcome-focused. Show exact Markdown only."

**Context**: When users describe new features they want to add to their prototype.

**Expected Behavior**: 
- Analyze the user's request for the core outcome
- Identify the most appropriate AreaPath
- Size the ability appropriately (1-3 days)
- Provide exact markdown that can be copy-pasted
- Ask clarifying questions if the scope is unclear

#### Decomposing Oversized Abilities
**Prompt**: "This Ability is too large. Break it into 2–4 sibling Abilities of equal size. Introduce sub-AreaPaths if needed."

**Context**: When an ability statement is too complex or large for a single 1-3 day deliverable.

**Expected Behavior**:
- Identify the distinct outcomes within the large ability
- Create smaller, focused abilities
- Suggest new AreaPaths if logical grouping emerges
- Maintain the original intent while improving deliverability
- Show the complete restructured markdown

#### Applying Ilities Coverage
**Prompt**: "Review the proposed feature. Ensure `*-ilities.md` covers quality standards (logging, testing, error handling). The system scans for files ending in `-ilities.md` anywhere under `.aidevbridge/straightline/**`. Suggest minimal updates."

**Context**: When adding new abilities that might need cross-cutting concerns.

**Expected Behavior**:
- Check if existing ilities cover the new ability
- Identify gaps in quality standards
- Propose minimal additions to ilities
- Focus on practical, implementable standards
- Avoid over-engineering for prototypes

#### Refactoring Large Files
**Prompt**: "Split file `src/server/server.ts` into multiple modules without changing behavior. Show complete replacement modules."

**Context**: When files exceed 400 lines and need to be broken down.

**Expected Behavior**:
- Analyze the file for logical separation points
- Create focused modules with clear responsibilities
- Maintain all existing functionality
- Update imports and exports appropriately
- Provide complete replacement code for all modules

#### Adding Backend Services
**Prompt**: "Add a REST API endpoint for `<feature>` that follows our rapid prototyping patterns. Include error handling and basic validation."

**Context**: When prototypes need server-side functionality.

**Expected Behavior**:
- Create focused API endpoints
- Use Node.js built-ins only
- Include proper error handling
- Add basic input validation
- Follow the established project structure

#### Implementing Real-time Features
**Prompt**: "Add WebSocket support for `<feature>` using Node.js built-ins. Include connection management and error recovery."

**Context**: When prototypes need real-time communication.

**Expected Behavior**:
- Implement WebSocket server using Node.js built-ins
- Handle connection lifecycle properly
- Include error recovery mechanisms
- Follow established patterns for server organization
- Keep implementation simple and focused

### Quality Gates for Rapid Prototypes

#### Definition of Done
Each ability should be:
- **Demonstrable**: Can be shown working in the browser or through clear output
- **Complete**: Includes basic error handling and user feedback
- **Independent**: Can be delivered without waiting for other abilities
- **Testable**: Has a way to verify it works correctly
- **Documented**: README updated with usage instructions

#### Technical Standards
- **No Console Errors**: Clean browser console in normal operation
- **Responsive Design**: Works on mobile and desktop
- **Accessibility**: Basic keyboard navigation and screen reader support
- **Performance**: Loads quickly and responds smoothly
- **Code Quality**: No dead code, clear naming, proper structure

#### Deployment Readiness
- **Single Command Start**: `run.bat` starts everything needed
- **Single Command Stop**: `stop.bat` cleans up all processes
- **Port Management**: All services run on documented ports
- **File Organization**: Clear structure that tells the application's story

---

## Future Prompt Collections

### Production Hardening Collection
**Purpose**: Transform successful prototypes into production-ready applications.

**Focus Areas**:
- Security hardening and vulnerability management
- Performance optimization and monitoring
- Scalability patterns and load handling
- Observability and debugging tools
- Deployment automation and CI/CD

**Key Prompts**:
- "Add security headers and input sanitization for production deployment"
- "Implement performance monitoring and alerting for critical paths"
- "Add comprehensive logging and error tracking for production debugging"

### AI Integration Collection
**Purpose**: Incorporate AI capabilities into applications.

**Focus Areas**:
- LLM API integration and prompt engineering
- Vector databases and semantic search
- AI-powered user interfaces
- Machine learning model integration
- Intelligent automation and workflows

**Key Prompts**:
- "Add LLM integration for `<feature>` using best practices for prompt engineering"
- "Implement semantic search using vector embeddings and similarity matching"
- "Create AI-powered user interface components with proper error handling"

### Mobile Adaptation Collection
**Purpose**: Adapt web applications for mobile devices and touch interfaces.

**Focus Areas**:
- Touch-optimized user interfaces
- Responsive design patterns
- Mobile-specific performance optimization
- Offline functionality and sync
- Progressive Web App features

**Key Prompts**:
- "Optimize the interface for touch input and mobile viewports"
- "Add offline functionality with data synchronization when connection returns"
- "Implement Progressive Web App features for mobile installation"

### Enterprise Integration Collection
**Purpose**: Connect applications with enterprise systems and workflows.

**Focus Areas**:
- Single Sign-On (SSO) integration
- Enterprise data sources and APIs
- Compliance and audit requirements
- Enterprise security standards
- Workflow automation and integration

**Key Prompts**:
- "Add SSO integration using enterprise identity providers"
- "Implement audit logging for compliance requirements"
- "Create workflow automation for enterprise processes"

---

## Collection Development Guidelines

### Creating New Collections
1. **Identify the Context**: What type of projects or development phase does this serve?
2. **Define Constraints**: What tools, languages, and practices are appropriate?
3. **Establish Patterns**: What common problems does this collection solve?
4. **Create Prompts**: What specific instructions help the LLM behave consistently?
5. **Test and Refine**: Use the collection on real projects and improve based on results

### Maintaining Collections
- **Regular Review**: Update collections based on new learnings and best practices
- **Version Control**: Track changes to collections over time
- **Documentation**: Keep clear examples and explanations for each collection
- **Community Input**: Gather feedback from teams using the collections
- **Evolution**: Allow collections to grow and adapt as needs change

### Cross-Collection Consistency
- **Shared Principles**: All collections should follow the same core principles
- **Compatible Patterns**: Collections should work together when needed
- **Consistent Language**: Use the same terminology across all collections
- **Unified Quality**: All collections should maintain the same quality standards

This framework ensures that every project, regardless of its specific needs, can benefit from proven patterns and consistent practices while remaining flexible enough to adapt to unique requirements.