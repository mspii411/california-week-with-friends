# California Week itinerary workflow

When the user requests an itinerary change in this repository:

1. Pull the latest `main` branch before editing.
2. Treat the itinerary change described in the current user request as the change specification.
3. Edit the production site directly in this repository.
4. Preserve existing content, imagery, responsive behavior, light/dark mode, and accessibility controls unless the stated change requires otherwise.
5. Validate the site, including referenced local assets and the relevant rendered itinerary content.
6. Commit and push the completed change directly to `main`.
7. Monitor the GitHub Actions AWS deployment until it succeeds.
8. Verify the change at https://californiaweekwithfriends.com.
9. Report the production result.

Do not publish to ChatGPT Sites unless the user explicitly requests a preview. Do not ask which changes are wanted when the requested itinerary change is already stated in the current conversation.
