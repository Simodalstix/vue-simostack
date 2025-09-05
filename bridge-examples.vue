<!-- Bridge Examples for ProjectsView.vue -->

<!-- Option 1: CSS-only animated bridge -->
<style scoped>
.bridge-horizontal {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, #06b6d4, transparent);
  z-index: 10;
  animation: pulse-bridge 2s infinite;
}

.bridge-vertical {
  position: absolute;
  width: 2px;
  background: linear-gradient(180deg, transparent, #06b6d4, transparent);
  z-index: 10;
  animation: pulse-bridge 2s infinite;
}

@keyframes pulse-bridge {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
</style>

<!-- Option 2: SVG animated bridge -->
<template>
  <svg class="absolute inset-0 pointer-events-none z-10" style="width: 100%; height: 100%;">
    <defs>
      <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0" />
        <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
      </linearGradient>
    </defs>
    
    <!-- Horizontal bridge -->
    <line x1="25%" y1="20%" x2="75%" y2="20%" 
          stroke="url(#bridgeGradient)" 
          stroke-width="2">
      <animate attributeName="stroke-opacity" 
               values="0.3;0.8;0.3" 
               dur="2s" 
               repeatCount="indefinite"/>
    </line>
    
    <!-- Vertical bridge -->
    <line x1="50%" y1="10%" x2="50%" y2="40%" 
          stroke="url(#bridgeGradient)" 
          stroke-width="2">
      <animate attributeName="stroke-opacity" 
               values="0.3;0.8;0.3" 
               dur="2s" 
               repeatCount="indefinite"/>
    </line>
  </svg>
</template>

<!-- Option 3: Vue component bridge with positioning -->
<template>
  <div class="bridge-container">
    <!-- Cards with bridge anchors -->
    <div class="card-with-bridge" data-bridge-id="k3s">
      <!-- Your card content -->
    </div>
    
    <div class="card-with-bridge" data-bridge-id="jenkins">
      <!-- Your card content -->
    </div>
    
    <!-- Bridge element -->
    <div class="bridge-line" 
         :style="bridgeStyle"
         v-if="showBridge">
      <div class="bridge-pulse"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBridge: true,
      bridgeStyle: {
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '50%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
        zIndex: 10
      }
    }
  }
}
</script>

<style scoped>
.bridge-container {
  position: relative;
}

.bridge-line {
  animation: bridge-glow 2s infinite;
}

.bridge-pulse {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #06b6d4;
  border-radius: 50%;
  top: -3px;
  left: 0;
  animation: bridge-travel 3s infinite;
}

@keyframes bridge-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@keyframes bridge-travel {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
</style>

<!-- Option 4: Simple dotted bridge -->
<div class="bridge-dotted absolute top-1/2 left-1/4 w-1/2 h-0.5 
            border-t-2 border-dotted border-cyan-400 opacity-60 z-10
            animate-pulse"></div>

<!-- Option 5: Flexbox bridge between specific cards -->
<div class="flex items-center justify-between relative">
  <div class="card">Card 1</div>
  
  <div class="bridge-flex flex-1 mx-4 relative">
    <div class="h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                animate-pulse"></div>
    <div class="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full 
                animate-ping"></div>
  </div>
  
  <div class="card">Card 2</div>
</div>