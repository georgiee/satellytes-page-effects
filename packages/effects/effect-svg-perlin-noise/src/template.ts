export const template = `
  <defs>
    <filter id="sy-effects-displacementFilter">
      <feTurbulence type="fractalNoise"
          numOctaves="1" result="turbulence">
          <animate attributeType="number" attributeName="baseFrequency" from="0.005" to="0.01"
          dur="40s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
          scale="40" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
`
