<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Site text/photo edits from /admin are stored as override lists in `site_content` (draft/published) and applied client-side by `ContentOverrides` in __root; keep source text in code as the default. Why: makes every page editable without refactoring each route.
- /admin access requires the `admin` role in `user_roles` (checked via `has_role`); no public signup. Why: only the office owner manages CRM, finance and site.
