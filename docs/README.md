# EchoAI Documentation Assets

This directory contains visual assets for the EchoAI project documentation.

## 📁 File Structure

```
docs/
├── README.md                    # This file
├── demo-desktop.gif            # Desktop demo animation
├── demo-mobile.gif             # Mobile demo animation
├── screenshot-light.png        # Light mode screenshot
├── screenshot-dark.png         # Dark mode screenshot
├── screenshot-settings.png     # Settings modal screenshot
├── screenshot-error.png        # Error handling screenshot
└── architecture-diagram.png    # System architecture diagram
```

## 🎬 Creating Demo GIFs

### Desktop Demo GIF

1. Record your screen using tools like:
   - **macOS**: QuickTime Player or ScreenFlow
   - **Windows**: OBS Studio or Camtasia
   - **Linux**: SimpleScreenRecorder or OBS Studio
2. Show the complete user flow:
   - Opening the app
   - Sending a message
   - Viewing AI response
   - Toggling dark/light mode
   - Opening settings
3. Optimize the GIF:
   - Keep duration under 30 seconds
   - Use 800px width for desktop
   - Compress using tools like [EZGIF](https://ezgif.com/optimize)

### Mobile Demo GIF

1. Use mobile screen recording:
   - **iOS**: Built-in screen recording
   - **Android**: Built-in screen recording or third-party apps
2. Show mobile-specific features:
   - Responsive design
   - Touch interactions
   - Mobile navigation
3. Optimize for mobile:
   - Use 300px width
   - Keep file size small
   - Show key interactions

## 📸 Taking Screenshots

### Recommended Tools

- **macOS**: Screenshot app or CleanShot X
- **Windows**: Snipping Tool or Snagit
- **Linux**: Flameshot or Shutter

### Screenshot Guidelines

1. **Resolution**: Use high DPI screenshots (2x or 3x)
2. **Browser**: Use Chrome or Firefox for consistency
3. **Window**: Show the full application window
4. **Content**: Include realistic content, not placeholder text
5. **Size**: Optimize for web (compress but maintain quality)

### Screenshot Checklist

- [ ] Light mode interface
- [ ] Dark mode interface
- [ ] Settings modal open
- [ ] Error state with retry options
- [ ] Mobile responsive view
- [ ] Chat conversation in progress

## 🎨 Design Guidelines

### Colors

- Use consistent color schemes
- Ensure good contrast for accessibility
- Match the actual application theme

### Composition

- Center the application in the frame
- Include some browser chrome for context
- Avoid showing personal information
- Use realistic but generic content

### File Formats

- **GIFs**: For animations and demos
- **PNG**: For screenshots (better quality)
- **WebP**: For web optimization (optional)

## 📏 Recommended Dimensions

| Asset Type   | Width | Height | Notes                 |
| ------------ | ----- | ------ | --------------------- |
| Desktop GIF  | 800px | Auto   | 16:9 or 4:3 ratio     |
| Mobile GIF   | 300px | Auto   | 9:16 ratio            |
| Screenshots  | 400px | Auto   | Maintain aspect ratio |
| Architecture | 800px | 600px  | Clear and readable    |

## 🛠️ Tools for Creation

### Screen Recording

- **Free**: OBS Studio, QuickTime (macOS)
- **Paid**: ScreenFlow, Camtasia, Loom

### GIF Creation

- **Online**: EZGIF, GIPHY, CloudConvert
- **Desktop**: Gifox, Kap, LICEcap

### Image Editing

- **Free**: GIMP, Paint.NET, Canva
- **Paid**: Photoshop, Sketch, Figma

## 📝 Content Guidelines

### Demo Content

- Use realistic but generic messages
- Show various conversation types
- Demonstrate key features
- Keep it professional and clean

### Screenshot Content

- Use placeholder names like "John Doe"
- Show example conversations
- Include error states
- Demonstrate all major features

## 🔄 Updating Assets

When updating screenshots or demos:

1. **Version Control**: Update assets when UI changes
2. **Consistency**: Ensure all assets match current design
3. **Testing**: Verify assets display correctly on GitHub
4. **Optimization**: Compress files for faster loading
5. **Accessibility**: Add proper alt text in README

## 📚 Resources

- [GitHub README Best Practices](https://github.com/matiassingers/awesome-readme)
- [Creating Great Screenshots](https://blog.github.com/2013-05-14-capturing-great-screenshots-for-your-github-readme/)
- [GIF Optimization Guide](https://blog.kraken.io/optimize-animated-gifs/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
