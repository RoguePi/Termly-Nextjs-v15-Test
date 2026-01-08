# JIRA Ticket: Termly Consent Management Integration Issues with Next.js 15/16

## Issue Summary
Termly consent banner and auto-blocking functionality not working correctly with Next.js 15 and Next.js 16 App Router architecture.

## Issue Type
Bug / Technical Debt - RESOLVED

## Priority
High

## Assignee
Rogelyn Pizon

## Description
The Termly consent management system fails to properly initialize and block third-party scripts in Next.js 15/16 applications using the App Router. The consent banner either doesn't appear or the auto-blocking mechanism doesn't prevent script execution. Termly's actual implementation uses inline script initialization with dynamic DOM insertion, which conflicts with Next.js SSR and React hydration.

## Technical Root Causes

### 1. **SSR Conflicts**
- Termly expects browser APIs (`window`, `document`) unavailable during SSR
- Script execution conflicts with React hydration timing

### 2. **Script Loading Order**
- Termly loads after React hydration, too late to block other scripts
- Component-level loading happens after critical render cycle

### 3. **CSP Violations**
- Next.js 15/16 stricter CSP blocks Termly's dynamic script injection
- Inline scripts bypass Termly's blocking mechanism

## Current Implementation Issues

```tsx
// PROBLEMATIC: Component-level script loading
export default function ThirdPartyScripts() {
  return (
    <>
      {/* CORRECT: Termly actual implementation */}
      <script src="https://app.termly.io/resource-blocker/270c91dd-6788-48d0-823d-1e04be35bede?autoBlock=on"></script>
      
      {/* These execute before Termly can block them */}
      <script type="text/plain" data-categories="analytics" src="..."/>
    </>
  )
}
```

**Root Problem**: Termly's resource-blocker script loads in React component lifecycle, causing timing issues with SSR and script blocking in Next.js 15/16.

## Technical Specifications

### Environment
- **Next.js Version**: 15.0.x / 16.0.x
- **React Version**: 18.x / 19.x
- **Architecture**: App Router
- **Rendering**: SSR + Client Hydration
- **Termly Version**: Latest embed.min.js

### Browser Compatibility
- Chrome 120+, Firefox 121+, Safari 17+
- Mobile browsers affected

## Acceptance Criteria

1. **Consent Banner Display**
   - [x] Banner appears on initial page load
   - [x] Banner persists across client-side navigation
   - [x] Banner respects user's previous consent choices

2. **Script Blocking Functionality**
   - [x] All `type="text/plain"` scripts remain blocked until consent
   - [x] `data-categories` attribute properly categorizes scripts
   - [x] Scripts execute only after category consent granted

3. **Performance Requirements**
   - [x] No CLS (Cumulative Layout Shift) from banner injection
   - [x] Script blocking doesn't delay critical rendering path
   - [x] Hydration mismatch warnings eliminated

## Investigation Progress

### Official Documentation
**Reference**: [Termly Next.js Integration Guide](https://support.termly.io/hc/en-us/articles/30710477395089-How-to-install-Termly-s-Consent-Management-Platform-in-a-Next-js-App)

### Current Findings
- Official Termly guide provides App Router compatible code
- Component loads script to document.head in useEffect
- Script loading order fixed by placing component before children in layout
- Suspense boundary required for useSearchParams in layout

### Implementation Results
1. **Component loading**: ✅ Fixed with document.head.appendChild
2. **useEffect**: ✅ Works with proper client-side checks
3. **beforeInteractive**: ✅ Not needed, direct DOM manipulation works
4. **Official guide**: ✅ Adapted for Next.js 15 compatibility

### Current Progress (Rogelyn Pizon)

**Status**: ✅ **SOLUTION FOUND** - Working Termly integration for App Router

**Solution**: 
- Use Termly's official App Router component
- Load Termly script before page content (before {children})
- Wrap in Suspense for useSearchParams
- Render third-party scripts with type="text/plain" immediately
- Termly handles blocking and consent management

## Potential Solutions

**Status**: ✅ **SOLUTION IMPLEMENTED**

Working approach for Next.js 15/16 App Router:
1. **Official Termly Component**: Use the component from Termly's documentation
2. **Early Loading**: Place Termly component before {children} in layout.tsx
3. **Suspense Wrapper**: Wrap component in Suspense for useSearchParams compatibility
4. **Direct DOM Manipulation**: Append script to document.head in useEffect
5. **Immediate Script Rendering**: Render third-party scripts with type="text/plain" without waiting

**Note**: Despite Termly's warning about v15 incompatibility, this approach works correctly with proper implementation.

## Related Issues
- Next.js Script optimization conflicts
- React 18/19 concurrent rendering compatibility
- CSP policy configuration requirements
- Termly official guide incompatibility with App Router
- Pages Router vs App Router architectural differences

## Labels
`nextjs15`, `nextjs16`, `termly`, `consent-management`, `ssr`, `app-router`, `technical-debt`