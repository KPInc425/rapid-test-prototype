# Release Notes Driven Communications

This document defines how to use **release notes as the primary communication mechanism** between delivery teams and business stakeholders in rapid prototyping environments. It transforms the traditional "status update" into a compelling story of progress, value delivery, and future possibilities.

---

## The Philosophy: Why Release Notes Matter

Traditional project communication often gets lost in technical details, process discussions, and status reports that don't clearly communicate **value delivered**. Release notes flip this by focusing on **what the system can now do** that it couldn't do before.

**Core Principle**: Every release should feel like unwrapping a gift - clear, valuable, and exciting about what's possible next.

---

## Looking at What We Have Already Built

### The Story of Progress
By helping tell a complete story from beginning to end, it's often useful to go back and speak to the order in which things were built, pin a few important decision milestones where decisions were made within the larger and smaller build context. A timeline, a chronology, a story, can in many ways be best told from the "here is what we set out to do", "here is what we did", each slice is roughly the same "size" of time.

### The Release Notes Package
Release Notes should be a **1/2 pager** that clearly communicates what the business received in trade for pay during this cycle. Think of it as:

- **A 30 second to 2 minute video-clip** showing the new capabilities
- **Screenshots** demonstrating the functionality
- **A tidy package, neatly wrapped, with a bow**
- **A decorated printed card hanging off the side** that says "Included Within"

This package is pushed across the table from the delivery team to the business, followed by a quick pull of what's next, validation, change-hats, or disappear for a week.

### Release Notes Structure
```markdown
# Release Notes - Week {YYYY}.{WW}

## What's New This Week
- ability to [specific outcome delivered]
- ability to [specific outcome delivered]
- ability to [specific outcome delivered]

## What This Means for You
[Business value explanation in plain language]

## What's Coming Next
- ability to [next planned outcome]
- ability to [next planned outcome]

## Technical Details
[Optional: Key technical decisions or changes]
```

---

## Telling the Story of Where We Go Next

### Forward-Looking Release Notes
Always be willing to help sort, resort, and create the work that writes, reads, and guesses-forecasts weekly "release notes" that highlight what the system will be able to do then, that it is unable to do now (ability to's delivered).

### Planning and Experimentation
Participate in leaning forward events where the LLM can help rearrange the remaining backlog items to pre-create future sets of "release notes" to help planning efforts to review, experiment with, and consider the health of the underlying backlog to answer critical conversations and moments now, and in the near-future if focus is given.

### Backlog Evolution
Inevitably as a user sorts and resorts and considers the available abilities that could be delivered in the near future, they are going to want to work on changes to the underlying `*-abilities.md` and `*-ilities.md` files. The system automatically scans for files ending in `-abilities.md` and `-ilities.md` anywhere under `.aidevbridge/straightline/**`. Do a good job of that, work with other knowledge and systems described among all these .md files to be helpful and make careful perfect little changes with the people as we go.

---

## Release Notes Best Practices

### Content Guidelines

#### What to Include
- **Clear outcomes**: What can the system do now that it couldn't before?
- **Business value**: Why does this matter to the end user?
- **Visual evidence**: Screenshots, videos, or demos
- **Next steps**: What's coming in the next release

#### What to Avoid
- **Technical jargon**: Keep it business-friendly
- **Implementation details**: Focus on outcomes, not how it was built
- **Vague statements**: Be specific about capabilities
- **Negative framing**: Focus on what was accomplished

### Writing Style
- **Active voice**: "The system can now..." not "A feature was added..."
- **Outcome-focused**: "Users can export data" not "Export functionality was implemented"
- **Present tense**: "The system does X" not "The system will do X"
- **Confident tone**: Celebrate the achievements

### Visual Elements
- **Screenshots**: Show the new functionality in action
- **Before/After**: Demonstrate the improvement
- **Video clips**: 30 seconds to 2 minutes maximum
- **Diagrams**: Show how new capabilities fit into the bigger picture

---

## Organizing Release Notes on Disk

### Directory Structure
```
.aidevbridge/
├── {backlog-name}/
│   ├── release{yyyy}.{week-number-of-year}/
│   │   ├── release-notes.md
│   │   ├── screenshots/
│   │   │   ├── feature-1-before.png
│   │   │   ├── feature-1-after.png
│   │   │   └── feature-2-demo.png
│   │   ├── videos/
│   │   │   ├── demo-30sec.mp4
│   │   │   └── walkthrough-2min.mp4
│   │   ├── assets/
│   │   │   ├── diagrams/
│   │   │   └── documentation/
│   │   └── archive/
│   │       ├── previous-releases/
│   │       └── templates/
│   └── templates/
│       ├── release-notes-template.md
│       ├── screenshot-guidelines.md
│       └── video-script-template.md
```

### File Naming Conventions
- **Release notes**: `release-notes.md`
- **Screenshots**: `{feature-name}-{before|after|demo}.png`
- **Videos**: `{type}-{duration}.mp4`
- **Assets**: `{category}-{description}.{ext}`

### Version Control
- Each release gets its own directory
- Previous releases are archived
- Templates are maintained separately
- All assets are versioned with the release

---

## Release Notes Templates

### Standard Release Notes Template
```markdown
# Release Notes - Week {YYYY}.{WW}
**Release Date**: {Date}
**Release Version**: {Version}

## 🎉 What's New This Week

### Core Functionality
- **ability to [specific outcome]**
  - [Brief description of what this enables]
  - [Business value or user benefit]

### User Experience
- **ability to [specific outcome]**
  - [Brief description of what this enables]
  - [Business value or user benefit]

### Data Management
- **ability to [specific outcome]**
  - [Brief description of what this enables]
  - [Business value or user benefit]

## 🎯 What This Means for You

[2-3 sentences explaining the business value and impact]

## 🔮 What's Coming Next

- **ability to [next planned outcome]**
- **ability to [next planned outcome]**
- **ability to [next planned outcome]**

## 📸 Visual Evidence

### Screenshots
- [Feature 1 Before/After]
- [Feature 2 Demo]
- [Feature 3 Workflow]

### Videos
- [30-second demo]
- [2-minute walkthrough]

## 🔧 Technical Notes

[Optional: Key technical decisions, performance improvements, or architectural changes]

## 📊 Metrics

- [Lines of code added/changed]
- [New capabilities delivered]
- [Performance improvements]
- [Bug fixes]

---
*Generated on {Date} by {Team}*
```

---

## Release Notes Workflow

### Weekly Release Cycle

#### Monday: Planning
- Review completed abilities from previous week
- Identify key outcomes to highlight
- Plan visual assets needed
- Draft release notes outline

#### Tuesday-Wednesday: Development
- Continue development work
- Capture screenshots as features are completed
- Record video clips of functionality
- Update release notes draft

#### Thursday: Review and Polish
- Complete release notes content
- Finalize screenshots and videos
- Review for business clarity
- Get stakeholder feedback

#### Friday: Release
- Publish release notes
- Share with stakeholders
- Archive previous release
- Plan next week's priorities

### Quality Checklist
- [ ] All new abilities are clearly described
- [ ] Business value is explained in plain language
- [ ] Visual evidence supports the claims
- [ ] Next week's priorities are outlined
- [ ] Technical details are appropriate for audience
- [ ] Tone is positive and achievement-focused

---

## Release Notes for Different Audiences

### Business Stakeholders
- Focus on business value and user benefits
- Use plain language and avoid technical jargon
- Include ROI and impact metrics
- Show competitive advantages

### Technical Teams
- Include architectural decisions and rationale
- Show code quality improvements
- Highlight performance optimizations
- Document technical debt addressed

### End Users
- Focus on new capabilities they can use
- Include step-by-step guides
- Show real-world use cases
- Provide training materials

### Management
- Highlight strategic progress
- Show resource utilization
- Include risk mitigation
- Demonstrate team velocity

---

## Release Notes Metrics and KPIs

### Content Metrics
- **Clarity score**: How easy is it to understand?
- **Completeness**: Are all abilities covered?
- **Timeliness**: How quickly are they published?
- **Engagement**: How many people read them?

### Business Impact
- **Stakeholder satisfaction**: Feedback scores
- **Decision speed**: How quickly are priorities set?
- **Alignment**: How well do teams understand direction?
- **Value perception**: How much value is perceived?

### Process Efficiency
- **Creation time**: How long to produce each release?
- **Review cycles**: How many iterations needed?
- **Stakeholder response**: How quickly do they respond?
- **Action items**: How many follow-up items generated?

This comprehensive approach to release notes transforms them from simple status updates into powerful communication tools that drive alignment, celebrate progress, and maintain momentum toward shared goals.
