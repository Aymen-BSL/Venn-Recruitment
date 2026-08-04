# Team Portraits

The first three portraits were supplied directly by the team and locally
optimized to 720 x 960 WebP:

- `ahmed-rosanally.webp`
- `aymen-ben-salem.webp`
- `yasir-gangat.webp`

The remaining four portraits are temporary layout placeholders:

- `temporary-man-4.webp`: https://images.cnippet.dev/image/upload/v1770400411/a4.jpg
- `temporary-man-5.webp`: https://www.pexels.com/photo/portrait-of-man-in-suit-16963942/
- `temporary-man-6.webp`: https://www.pexels.com/photo/professional-portrait-of-a-man-in-greenville-studio-30004318/
- `temporary-man-7.webp`: https://www.pexels.com/photo/professional-portrait-of-man-in-black-suit-29501967/

The Pexels placeholders are free to use under the Pexels license.

## Replacing the temporary team members

1. Crop each real portrait to a 3:4 vertical ratio and export it as WebP. A
   recommended size is 720 x 960 pixels.
2. Place the new image in this folder: `public/media/team/`.
3. Open `components/sections/team-members.ts`.
4. For the relevant member, replace the `image`, `name`, and `role` values. Image
   paths begin with `/media/team/`, for example:

   ```ts
   {
     image: "/media/team/aymen-ben-salem.webp",
     name: "Aymen Ben Salem",
     role: "Managing Director",
   }
   ```

5. Delete the replaced temporary image after no entry references it.

Use a new descriptive filename for each real portrait. This avoids browsers
showing an older cached image after a replacement.
