# StraightLine PMM · LLM Instructions

This document instructs the coding assistant (LLM, Copilot, GPT-x) on how to **help humans manage a StraightLine backlog**. It explains the artifact types, the rules of use, the relationship between business and delivery teams, and exactly how the LLM should behave when asked to participate in backlog creation or updates.

---

## The Philosophy: Why StraightLine Exists

Traditional backlogs grew into bloated lists of tasks, stories, and "tickets" that were often too vague for business and too detailed for engineers. They became a place where **risk management** overshadowed **value delivery**. The business couldn't understand what was being built, engineers couldn't understand why, and everyone got lost in the noise of process.

StraightLine simplifies this into only two perspectives:
1. **Business View**: Abilities (outcome-focused) organized by AreaPaths (categories).
2. **Delivery View**: All the messy technical details that make things real, tracked in Additional Details or Ilities.

By enforcing simplicity at the business layer and clarity at the delivery layer, StraightLine ensures **rapid prototyping, predictable delivery, and shared understanding**.

The goal is to make prototyping software as easy as prototyping a fancy pizza, instead of the large effort all software builds seem today: answer a few questions, let the team worry about all the little parts and variety of planning, purchasing, inventory, ordering, cleaning, prepping, scheduling, and finally that pizza idea you wanted to prototype/try? Built and delivered to your table in about 15 minutes.

---

## The Three Artifact Types

### AreaPath
- **Representation**: Markdown headers (`#`, `##`, `###` …).
- **Purpose**: Act like folders or directories, organizing abilities into logical categories.
- **Behavior**: Decomposable - large AreaPaths can be split into smaller sub-paths.
- **Naming**: Keep short and very human/business friendly, avoid technical jargon.

### Ability
- **Representation**: List items beginning with the keyword **`ability`**.
- **Purpose**: Outcome-focused statements that describe what the system can do.
- **Language**: Business-friendly, understandable to non-technical stakeholders.
- **Size**: Must be deliverable in **1–3 days** by a team of 3–5 people, done-done.
- **Scope**: Each ability should be valuable and interesting on its own.

### Additional Details
- **Representation**: Tab + `+` marker beneath an Ability or AreaPath.
- **Purpose**: Provide clarifications, acceptance notes, examples, or references.
- **Rule**: Should **describe** the Ability, not replace it. If it's its own outcome, it belongs as an Ability.
- **Visibility**: Most planning and creative views don't show additional details information.

## File Management and Discovery

### Backlog File Naming Convention
- **Abilities files**: Must end with `-abilities.md` (e.g., `project-name-abilities.md`, `botbutler-abilities.md`)
- **Ilities files**: Must end with `-ilities.md` (e.g., `project-name-ilities.md`, `botbutler-ilities.md`)

### Automatic File Discovery
The system automatically scans for files ending in `-abilities.md` and `-ilities.md` anywhere under `.aidevbridge/straightline/**`. This means:
- Files can be organized in any folder structure under `.aidevbridge/straightline/`
- Multiple projects can coexist with their own backlog files
- The system will find and manage all backlog files regardless of directory depth
- Folder organization is flexible and can be adapted to project needs

---

## The Strict Markdown Grammar

```
# Name of Product/project/build

## AreaPath near root like this it will be a large organized section of the inventory of the overall build

### Sub AreaPath as we move into the middle of the AreaPaths inventory language gives way to provide lineage and decompositionally relatable abilities categorical grouping
- ability to do something
    + additional details about this ability
    + additional details about this ability

#### Sub Sub AreaPath to break an ability that is too big into smaller valuable pieces
- ability to do something that solves a smaller part
    + additional details about this ability    
- ability to do something that solves a smaller part
- ability to do something that solves a smaller part
    + additional details about this ability
```

**Key Rules:**
- Header tags represent AreaPath hierarchy and stay left-justified
- Dash character list items represent ability statements and stay left-justified
- Tab indent and plus character list items represent additional details
- All data noise and input information from various sources can be pressed down into one of these 3 artifacts

---

## The Five Rules for the LLM

### 1. No Generics, No Fluff
Every Ability must describe a clear, valuable outcome. Do not insert filler, generic statements, or placeholder text. We actually want these backlog files to stay as small and contain the least amount of information possible without sacrificing the quality of the information therein.

### 2. Business Language First
Keep Ability statements understandable to non-technical stakeholders. Push all technical jargon and other language that fits out to the -ilities document where we deal with big cross cutting concerns that generally only need discussed seldom and stand in great as most of a "Definition of Done" the business and delivery team can own together.

### 3. Size Discipline
If an Ability is too big (>3 days), decompose it into smaller Abilities. Use new AreaPaths if needed. Each statement should be about the same size in terms of delivery time as one another. They should all be about 1–3 days on average to complete considering the fullness of what it means to get work all the way to completely done and delivered.

### 4. Balance
No AreaPath should contain more than 5 Abilities without considering sub-division. Any Area-Paths that contain more than 5 abilities are potential candidates for further area-path decomposition.

### 5. Iteration
The backlog evolves as conversation with users continues. Treat each update as an opportunity to clarify, restructure, and simplify. The business rarely if ever looks down at additional information, they need the clear language and organizational structure offered by the AreaPath and Ability Statements.

---

## The Five-Step Workflow

When a user brings an idea, follow this exact process:

### Step 1: Interpret and Incorporate
Help incorporate the new information when it applies into either the `*-abilities.md` "Ability Statements" or the `*-ilities.md` (project cross cutting concerns, technical specifications, things true for most all of the backlog-abilities). The system will automatically scan for files ending in `-abilities.md` and `-ilities.md` anywhere under `.aidevbridge/straightline/**`. Take what they have started to outline and organize it and restate it all cleanly, expand where useful to finish thoughts, round out behaviors etc. hyper focused on these new changes.

### Step 2: Check for Wholeness
Now consider what you have written for its "wholeness" - does it effectively describe well all of the important parts of this build?

### Step 3: Size and Decompose
Look at each ability statement that has been added or changed and see if they are all about the right size, all about the same size. For some items that feel larger, work to break into multiple valuable pieces that can be prioritized individually and delivered independently. Use the nesting of header tags to create a bit of categorical decomposition of useful pieces of abilities etc.

### Step 4: Balance AreaPaths
Any Area-Paths that contain more than 7 abilities are potential candidates for further area-path decomposition. Double check that there isn't some useful/needful further area-path decomposition to provide useful bucketing and categorization of the abilities.

### Step 5: Final Pass
Based on all the data and conversations so far, do a final pass in the document and fill out any details we have lost along the way. We used to have much more additional info before, let's not lose any of the important details we know of.

---

## Example: Complete Backlog Structure

```markdown
# <Product Name>

## Core Functionality
- ability to capture user input through multiple interfaces
    + supports mouse, touch, and keyboard input
    + maintains input state across sessions
- ability to process and validate user data
    + handles malformed input gracefully
    + provides clear error messages
- ability to persist data between sessions
    + uses localStorage for client-side persistence
    + includes data migration for schema changes

## User Interface
- ability to display information in a clear, accessible format
    + supports high contrast mode
    + responsive design for mobile and desktop
- ability to provide visual feedback for user actions
    + loading states for async operations
    + success/error notifications

### Navigation
- ability to move between different sections of the application
    + keyboard shortcuts for power users
    + breadcrumb navigation for complex flows
- ability to search and filter content
    + real-time search with debouncing
    + save search preferences

## Data Management
- ability to import data from external sources
    + CSV, JSON, XML formats supported
    + handles encoding issues gracefully
- ability to export data in multiple formats
    + includes metadata and timestamps
    + supports batch operations
```

---

## Best Practices for LLM Behavior

### When to Ask Questions
- When the user's request is ambiguous or could be interpreted multiple ways
- When you need to understand the business context or user goals
- When you're unsure whether something belongs in abilities vs ilities
- When the scope of an ability seems unclear

### When to Propose Updates
- When you have enough context to make a reasonable proposal
- When the user has provided specific requirements or constraints
- When you can identify clear gaps in the current backlog
- When you can suggest improvements to existing abilities

### How to Present Proposals
- Show exact markdown blocks, not vague summaries
- Explain your reasoning for placement and sizing
- Highlight any assumptions you're making
- Ask for confirmation before making changes to files

### What to Avoid
- Don't add generic boilerplate or placeholder text
- Don't make assumptions about technical implementation details
- Don't create abilities that are too large or too small
- Don't duplicate information across multiple abilities
- Don't use technical jargon in ability statements

---

## The Definition of Done for Abilities

Each ability should be:
- **Demonstrable**: Can be shown working in the UI or through clear output
- **Complete**: Includes all necessary testing, error handling, and documentation
- **Independent**: Can be delivered without waiting for other abilities
- **Valuable**: Provides clear value to the end user
- **Measurable**: Success criteria are clear and testable

Remember: The business only sees and helps to decompose (areapath), categorize (areapath), decompose (ability statements) for the purpose of prioritization and vision sharing, inventory of ideas, articulated as ability statements of future outcomes we want.



## Tokenization Rules
- Replace specific product names with placeholders:
  - `<ProductName>`, `<FeatureX>`, `<ModuleY>`.
- Examples must remain generic:
  - ✅ `- ability to export data as file`
  - ❌ `- ability to export canvas drawing as PNG`
- Keep outcome statements technology-neutral where possible:
  - ✅ “ability to persist data”  
  - ❌ “ability to persist data in MongoDB”

