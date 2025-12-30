# Design Brainstorming: AI Medical Scribe MVP

## <response>
<probability>0.08</probability>
<text>
<idea>
  **Design Movement**: Neumorphism 2.0 (Soft UI)
  **Core Principles**:
  1.  **Tactile Realism**: Elements should feel like physical buttons and cards on a medical device.
  2.  **Calm & Clean**: A sterile but warm environment to reduce cognitive load for stressed doctors.
  3.  **Focus-Driven**: The interface highlights the active task (input vs. review) using depth and light.
  **Color Philosophy**:
  -   **Base**: Off-white / Soft Gray (#F0F2F5) to mimic high-end medical equipment.
  -   **Accent**: Clinical Blue (#007AFF) for primary actions, but softened with gradients.
  -   **Status**: Soft Green (#34C759) for success/accuracy, Warm Amber (#FF9500) for warnings.
  **Layout Paradigm**:
  -   **Split-Screen Asymmetry**: Left panel (Input) is slightly recessed (inset shadow), Right panel (Output) is elevated (drop shadow).
  -   **Floating Controls**: The "Generate" button floats between the two panels, acting as the bridge.
  **Signature Elements**:
  -   **Soft Shadows**: Use multiple box-shadow layers to create realistic depth.
  -   **Rounded Corners**: Super-rounded corners (24px+) to feel friendly and safe.
  -   **Subtle Gradients**: Very light linear gradients on backgrounds to avoid flatness.
  **Interaction Philosophy**:
  -   **Press & Release**: Buttons should visually depress when clicked.
  -   **Smooth Transitions**: The generation process should be a smooth morphing animation from left to right.
  **Animation**:
  -   **Pulse**: The "Generate" button pulses gently when input is detected.
  -   **Skeleton Loading**: Shimmering skeleton screens for the output panel during generation.
  **Typography System**:
  -   **Headings**: **Nunito** (Rounded sans-serif) for a friendly, approachable feel.
  -   **Body**: **Lato** (Humanist sans-serif) for high readability in clinical notes.
</idea>
</text>
</response>

## <response>
<probability>0.06</probability>
<text>
<idea>
  **Design Movement**: Swiss Style (International Typographic Style)
  **Core Principles**:
  1.  **Grid-Based Precision**: Everything aligns perfectly to a strict grid, reflecting medical accuracy.
  2.  **Objective Clarity**: No decorative elements; form follows function.
  3.  **High Contrast**: Stark black and white with bold splashes of color for hierarchy.
  **Color Philosophy**:
  -   **Base**: Stark White (#FFFFFF) and Deep Black (#111111).
  -   **Accent**: Swiss Red (#FF3B30) for urgent actions/alerts, Cobalt Blue (#0040DD) for primary interactions.
  -   **Intent**: To convey absolute precision, authority, and reliability.
  **Layout Paradigm**:
  -   **Modular Grid**: The screen is divided into clear, bordered modules.
  -   **Typographic Hierarchy**: Size and weight define the structure, not boxes or shadows.
  **Signature Elements**:
  -   **Thick Borders**: 2px solid black borders separating sections.
  -   **Oversized Typography**: Large, bold headings for "Subjective", "Objective", etc.
  -   **Asymmetric Balance**: Content is balanced by negative space, not symmetry.
  **Interaction Philosophy**:
  -   **Instant Feedback**: Hover states are sharp and immediate (color inversion).
  -   **Snap**: Animations are quick and snappy (ease-out-quint).
  **Animation**:
  -   **Slide & Reveal**: Panels slide in from the side with precision.
  -   **Typewriter Effect**: The generated text appears character-by-character or word-by-word, emphasizing the "scribing" aspect.
  **Typography System**:
  -   **Headings**: **Helvetica Now Display** (or Inter Tight) - Bold, tight tracking.
  -   **Body**: **JetBrains Mono** (Monospace) for the raw input/output to feel like data, or **Inter** for readability.
</idea>
</text>
</response>

## <response>
<probability>0.05</probability>
<text>
<idea>
  **Design Movement**: Glassmorphism (Frosted Glass)
  **Core Principles**:
  1.  **Translucency**: Layers of frosted glass to create depth and context.
  2.  **Vivid Backgrounds**: A blurred, colorful background mesh that shines through the glass.
  3.  **Light & Border**: Thin, semi-transparent white borders to define edges.
  **Color Philosophy**:
  -   **Base**: Semi-transparent White (rgba(255, 255, 255, 0.7)) with background blur.
  -   **Background**: A moving mesh gradient of Teal (#20C997), Purple (#6610F2), and Blue (#0D6EFD) to represent the fusion of technology and biology.
  -   **Text**: Dark Navy (#1E293B) for contrast against the glass.
  **Layout Paradigm**:
  -   **Floating Cards**: The input and output areas are floating glass cards suspended over the abstract background.
  -   **Z-Axis Layering**: Modals and tooltips float significantly higher than the base layer.
  **Signature Elements**:
  -   **Backdrop Filter**: `backdrop-filter: blur(16px)` is the key CSS property.
  -   **1px White Border**: A subtle white border with low opacity to simulate the edge of glass.
  -   **Noise Texture**: A subtle grain overlay to add realism to the glass.
  **Interaction Philosophy**:
  -   **Depth Shift**: Hovering over a card lifts it slightly (scale + shadow).
  -   **Glow**: Active elements emit a soft glow.
  **Animation**:
  -   **Parallax**: The background mesh moves slowly, creating a living feeling.
  -   **Blur In**: Content fades in while blurring into focus.
  **Typography System**:
  -   **Headings**: **Outfit** (Geometric sans) for a modern, tech-forward look.
  -   **Body**: **DM Sans** for clean, legible text on glass surfaces.
</idea>
</text>
</response>
