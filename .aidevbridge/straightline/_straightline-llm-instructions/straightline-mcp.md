# StraightLine PMM · Localhost MCP Instructions

This document explains how the **localhost MCP server** supports StraightLine backlog management. It gives the LLM programmatic tools to read, write, and organize Abilities and Ilities through a structured protocol, ensuring that backlog management becomes interactive, safe, and structured.

---

## The Purpose: Why MCP in StraightLine

Markdown is human-friendly, but not always machine-friendly. The MCP (Model Context Protocol) server acts as a structured **bridge** between human creativity and machine precision:

- **Humans** write ideas in free text, think in concepts, and communicate naturally
- **The LLM** interprets, structures, and proposes backlog changes with precision
- **MCP** ensures updates are atomic, traceable, and reversible

This creates a workflow where:
1. Humans can focus on the "what" and "why" 
2. LLMs can handle the "how" and "where"
3. MCP ensures consistency and prevents data loss

---

## Core MCP Operations

### Query Operations
**Purpose**: Fetch current backlog state before making proposals

**Capabilities**:
- List all AreaPaths with their hierarchy
- List all Abilities under a specific AreaPath
- Search Abilities by keyword or pattern
- Filter by type (Ability vs Ility)
- Get Additional Details for specific Abilities
- Retrieve cross-cutting concerns from ilities

**Example Queries**:
```
GET /api/areapaths
GET /api/abilities?areapath=/DataManagement
GET /api/search?q=export&type=ability
GET /api/details?ability=export-data
```

### Insert Operations
**Purpose**: Add new content while maintaining structure

**Capabilities**:
- Add new Abilities under specified AreaPaths
- Add new AreaPaths with proper hierarchy
- Add Additional Details to existing Abilities
- Insert Ilities entries for cross-cutting concerns
- Enforce correct Markdown grammar automatically

**Validation**:
- Ensures proper header hierarchy
- Validates ability statement format
- Checks for duplicate abilities
- Maintains size constraints (≤5 abilities per AreaPath)

### Update Operations
**Purpose**: Modify existing content atomically

**Capabilities**:
- Replace existing Ability statements
- Update Additional Details
- Modify AreaPath names and hierarchy
- Update Ilities entries
- Ensure consistency across related entries

**Safety Features**:
- Atomic updates (all-or-nothing)
- Version tracking for rollback capability
- Conflict detection for concurrent edits
- Validation before applying changes

### Move/Sort Operations
**Purpose**: Reorganize content for better structure

**Capabilities**:
- Move Abilities between AreaPaths
- Reorganize AreaPath hierarchy
- Split large AreaPaths into sub-paths
- Merge related AreaPaths
- Balance ability distribution

**Intelligence**:
- Suggests optimal placement for new abilities
- Identifies when AreaPaths need decomposition
- Maintains logical grouping and flow
- Preserves relationships between abilities

---

## Tokenization and Genericization

### The Tokenization Problem
When humans describe their ideas, they often use specific product names, technologies, and implementation details. For reusable backlog templates, we need to extract the **essence** while removing the **specifics**.

### Tokenization Rules
MCP ensures all entries are **generic** and reusable:

**Product Names**:
- Replace specific product names with `<ProductName>`
- Use `<FeatureX>`, `<ModuleY>` for components
- Keep examples technology-neutral

**Technology References**:
- ✅ "ability to persist data"
- ❌ "ability to persist data in MongoDB"
- ✅ "ability to export data as file"
- ❌ "ability to export canvas drawing as PNG"

**Implementation Details**:
- Move specific technologies to Additional Details
- Keep ability statements outcome-focused
- Push technical jargon to Ilities document

### Genericization Process
1. **Extract**: Identify the core outcome being described
2. **Abstract**: Remove product-specific language
3. **Generalize**: Make applicable to similar contexts
4. **Validate**: Ensure the generic version maintains meaning
5. **Preserve**: Keep specifics in Additional Details

---

## Integration Patterns with LLM

### The Complete Workflow

#### Phase 1: Discovery
```
User: "We need to add user authentication to our app"
LLM: [Queries MCP for current authentication abilities]
MCP: Returns existing auth-related abilities and ilities
LLM: [Analyzes gaps and proposes new abilities]
```

#### Phase 2: Proposal
```
LLM: [Proposes specific markdown blocks for new abilities]
User: "That looks good, but we also need password reset"
LLM: [Queries MCP for password reset patterns]
MCP: Returns similar abilities from other projects
LLM: [Proposes additional abilities with examples]
```

#### Phase 3: Implementation
```
User: "Perfect, add those to the backlog"
LLM: [Sends atomic updates to MCP]
MCP: [Validates, applies changes, returns confirmation]
LLM: [Confirms successful update and shows final result]
```

### Error Handling and Recovery

**Validation Failures**:
- MCP validates all changes before applying
- Returns specific error messages for invalid formats
- Suggests corrections for common mistakes
- Maintains original state on validation failure

**Conflict Resolution**:
- Detects concurrent modifications
- Provides merge suggestions for conflicts
- Maintains change history for rollback
- Notifies users of potential issues

**Rollback Capability**:
- Every change is versioned and reversible
- Can rollback to any previous state
- Maintains audit trail of all modifications
- Supports selective rollback of specific changes

---

## Advanced MCP Features

### Smart Suggestions
**Context-Aware Recommendations**:
- Suggests optimal AreaPath placement based on content
- Recommends ability decomposition when size is too large
- Identifies missing ilities coverage for new abilities
- Proposes related abilities based on patterns

**Pattern Recognition**:
- Learns from successful ability structures
- Identifies common ability patterns across projects
- Suggests improvements based on best practices
- Maintains knowledge base of effective backlog structures

### Batch Operations
**Bulk Updates**:
- Apply multiple changes in single transaction
- Validate entire batch before committing
- Provide rollback for entire batch if needed
- Support for importing/exporting ability sets

**Template Application**:
- Apply common ability patterns to new projects
- Customize templates based on project type
- Maintain template library for reuse
- Version control for template evolution

### Analytics and Insights
**Backlog Health Metrics**:
- Track ability size distribution
- Monitor AreaPath balance
- Identify oversized or undersized abilities
- Suggest structural improvements

**Usage Patterns**:
- Track which abilities are most commonly added
- Identify successful ability patterns
- Monitor backlog evolution over time
- Provide insights for backlog optimization

---

## MCP Server Implementation

### Core Architecture
```
MCP Server
├── Parser (Markdown → Structured Data)
├── Validator (Rules & Constraints)
├── Storage (Versioned Backlog State)
├── API (RESTful Operations)
└── Analytics (Patterns & Insights)
```

### API Endpoints
```
GET    /api/backlog                    # Full backlog state
GET    /api/areapaths                  # AreaPath hierarchy
GET    /api/abilities                  # All abilities
GET    /api/abilities/{id}             # Specific ability
POST   /api/abilities                  # Create new ability
PUT    /api/abilities/{id}             # Update ability
DELETE /api/abilities/{id}             # Remove ability
GET    /api/ilities                    # Cross-cutting concerns
POST   /api/ilities                    # Add ility
GET    /api/suggestions                # Smart suggestions
POST   /api/validate                   # Validate changes
GET    /api/history                    # Change history
POST   /api/rollback/{version}         # Rollback to version
```

### Data Models
```typescript
interface AreaPath {
  id: string;
  name: string;
  level: number;
  parent?: string;
  children: string[];
  abilities: string[];
}

interface Ability {
  id: string;
  statement: string;
  areapath: string;
  additionalDetails: string[];
  size: 'small' | 'medium' | 'large';
  status: 'draft' | 'approved' | 'in-progress' | 'done';
}

interface Ility {
  id: string;
  category: string;
  description: string;
  appliesTo: string[];
  priority: 'low' | 'medium' | 'high';
}
```

---

## Best Practices for MCP Usage

### For LLMs
- Always query current state before proposing changes
- Use batch operations for related changes
- Validate proposals before sending to MCP
- Leverage smart suggestions for optimal placement
- Maintain change history for user reference

### For Users
- Review MCP suggestions before accepting
- Use rollback capability when needed
- Monitor backlog health metrics regularly
- Leverage templates for common patterns
- Keep ilities updated as abilities evolve

### For Developers
- Implement proper error handling for all operations
- Maintain comprehensive logging for debugging
- Use atomic transactions for data consistency
- Implement proper authentication and authorization
- Monitor performance and optimize as needed

---

## Future Enhancements

### Planned Features
- **AI-Powered Suggestions**: Use LLM to suggest ability improvements
- **Cross-Project Learning**: Learn from successful backlog patterns
- **Integration APIs**: Connect with project management tools
- **Real-time Collaboration**: Multiple users editing simultaneously
- **Advanced Analytics**: Deeper insights into backlog effectiveness

### Extension Points
- **Custom Validators**: Project-specific validation rules
- **Plugin System**: Extend MCP functionality
- **Export Formats**: Generate reports in various formats
- **API Integrations**: Connect with external systems
- **Workflow Automation**: Trigger actions based on changes

This MCP server transforms backlog management from a manual, error-prone process into an intelligent, collaborative system that scales with your team's needs.