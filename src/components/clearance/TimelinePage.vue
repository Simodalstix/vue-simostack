<template>
  <div class="flex flex-col h-full w-full overflow-hidden select-none">

    <!-- title strip -->
    <div class="shrink-0 px-6 pt-4 pb-3 flex items-end justify-between">
      <div>
        <h1 class="text-[15px] font-semibold tracking-[0.01em] text-[#F5F2EC]">Personal history timeline</h1>
        <p class="text-[11px] text-[#7A8A99] mt-0.5">Education, employment and addresses from age 16 (2002) to present.</p>
      </div>
      <!-- lane legend -->
      <div class="flex items-center gap-4">
        <template v-for="lane in lanes" :key="lane.id">
          <!-- travel: show both region hues -->
          <template v-if="lane.markers">
            <div v-for="r in travelLegend" :key="r.label" class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full" :style="{ background: r.fill, border: `1px solid ${r.border}` }"></span>
              <span class="text-[10px] uppercase tracking-[0.08em] text-[#7A8A99]">{{ r.label }}</span>
            </div>
          </template>
          <div v-else class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-[2px]" :style="{ background: lane.fill, border: `1px solid ${lane.border}` }"></span>
            <span class="text-[10px] uppercase tracking-[0.08em] text-[#7A8A99]">{{ lane.label }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- timeline grid: [labels] [childhood gutter] [proportional track] -->
    <div class="flex-1 flex min-h-0 border-t border-ob-sand/14">

      <!-- left lane-label column -->
      <div class="shrink-0 w-[94px] flex flex-col border-r border-ob-sand/14">
        <div class="shrink-0" :style="{ height: AXIS_H + 'px' }"></div>
        <div
          v-for="lane in packedLanes"
          :key="lane.id"
          class="px-3 border-t border-ob-sand/8"
          :class="lane.markers ? 'flex-1 flex items-start pt-2' : 'flex items-center'"
          :style="lane.markers ? {} : { height: lane.height + 'px' }"
        >
          <span class="text-[10.5px] font-semibold tracking-[0.02em] leading-tight" :style="{ color: lane.border }">{{ lane.label }}</span>
        </div>
      </div>

      <!-- childhood gutter -->
      <div class="shrink-0 w-[42px] flex flex-col border-r border-dashed border-ob-sand/18 relative">
        <div class="shrink-0 flex items-center justify-center" :style="{ height: AXIS_H + 'px' }">
          <span class="text-[#66757F] text-[15px] font-mono leading-none">//</span>
        </div>
        <div class="flex-1 flex items-center justify-center px-1">
          <p class="text-[7.5px] leading-[1.4] text-[#5B6873] text-center">
            childhood abbreviated · full history from age 16
          </p>
        </div>
      </div>

      <!-- proportional track -->
      <div ref="plotRef" class="flex-1 flex flex-col min-w-0 relative">

        <!-- era washes: New Zealand (left) / Australia (right), split at 2014 -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-0 bottom-0 left-0" :style="{ width: relocatePct + '%', background: 'rgba(83,130,160,0.07)' }"></div>
          <div class="absolute top-0 bottom-0 right-0" :style="{ left: relocatePct + '%', background: 'rgba(196,144,58,0.07)' }"></div>
          <!-- era watermarks: silver fern (NZ) / kangaroo (AUS) -->
          <div class="absolute" :style="{ left: '0', width: relocatePct + '%', top: '6%', bottom: '6%', ...maskStyle(fernUrl, 'rgba(150,172,188,0.08)') }"></div>
          <div class="absolute" :style="{ left: relocatePct + '%', right: '0', top: '9%', bottom: '9%', ...maskStyle(kangarooUrl, 'rgba(201,150,70,0.09)') }"></div>
          <!-- relocation divider -->
          <div class="absolute top-0 bottom-0 w-px bg-ob-sand/35" :style="{ left: relocatePct + '%' }"></div>
          <!-- era labels -->
          <div
            class="absolute top-[3px] text-[8px] uppercase tracking-[0.14em] text-[#6E7C88] whitespace-nowrap"
            :style="{ left: (relocatePct / 2) + '%', transform: 'translateX(-50%)' }"
          >New Zealand</div>
          <div
            class="absolute top-[3px] text-[8px] uppercase tracking-[0.14em] text-[#8C7A5C] whitespace-nowrap"
            :style="{ left: (relocatePct + (100 - relocatePct) / 2) + '%', transform: 'translateX(-50%)' }"
          >Australia</div>
        </div>

        <!-- axis: ticks + year labels + baseline -->
        <div class="shrink-0 relative" :style="{ height: AXIS_H + 'px' }">
          <div
            v-for="t in ticks"
            :key="t.year"
            class="absolute bottom-0 flex flex-col items-center"
            :style="{ left: t.pct + '%', transform: 'translateX(-50%)' }"
          >
            <span class="text-[9.5px] text-[#7A8A99] tabular-nums mb-1">{{ t.year }}</span>
            <span class="w-px h-1.5 bg-ob-sand/30"></span>
          </div>
          <!-- present marker -->
          <div
            class="absolute bottom-0 flex flex-col items-center"
            :style="{ left: presentPct + '%', transform: 'translateX(-50%)' }"
          >
            <span class="text-[9px] font-semibold tracking-[0.04em] text-ob-teal/90 mb-1">now</span>
            <span class="w-px h-2 bg-ob-teal/70"></span>
          </div>
          <!-- baseline -->
          <div class="absolute bottom-0 left-0 right-0 h-px bg-ob-sand/25"></div>
        </div>

        <!-- lanes -->
        <div
          v-for="lane in packedLanes"
          :key="lane.id"
          class="relative border-t border-ob-sand/8"
          :class="lane.markers ? 'flex-1' : ''"
          :style="lane.markers ? {} : { height: lane.height + 'px' }"
        >
          <!-- faint year gridlines -->
          <div
            v-for="t in ticks"
            :key="'g-' + t.year"
            class="absolute top-0 bottom-0 w-px bg-ob-sand/8"
            :style="{ left: t.pct + '%' }"
          ></div>
          <!-- present marker line -->
          <div class="absolute top-0 bottom-0 w-px bg-ob-teal/25" :style="{ left: presentPct + '%' }"></div>

          <!-- travel lane: small trans-Tasman callouts + rich overseas bubbles -->
          <template v-if="lane.markers">

            <!-- trans-Tasman: marker dot → leader line → staggered 2-line callout -->
            <template v-for="c in tasmanCallouts" :key="c.item.id">
              <div
                class="absolute rounded-full"
                :style="{
                  left: c.xp + '%',
                  top: (TRAVEL_MARKER_Y - 4) + 'px',
                  width: '8px', height: '8px',
                  transform: 'translateX(-50%)',
                  backgroundColor: c.item.status === 'cancelled' ? 'transparent' : c.region.fill,
                  border: `1px ${c.item.status === 'cancelled' ? 'dashed' : 'solid'} ${c.region.border}`,
                  opacity: c.item.status === 'cancelled' ? 0.6 : 1,
                }"
                :title="`${c.item.label} — ${c.item.route} (${c.item.dates})`"
              ></div>
              <div
                class="absolute w-px"
                :style="{ left: c.xp + '%', top: TRAVEL_MARKER_Y + 'px', height: (c.y - TRAVEL_MARKER_Y) + 'px', backgroundColor: c.region.border, opacity: 0.45 }"
              ></div>
              <div
                class="absolute leading-tight"
                :style="calloutStyle(c)"
                :title="`${c.item.label} — ${c.item.route} (${c.item.dates})`"
              >
                <div class="text-[10px] font-semibold truncate" :style="{ color: c.region.border }">{{ c.line1 }}</div>
                <div class="text-[8.5px] text-[#8A98A6] truncate">{{ c.line2 }}</div>
              </div>
            </template>

            <!-- overseas: the Big 3 holidays as rich info bubbles -->
            <template v-for="b in overseasBubbles" :key="b.item.id">
              <!-- marker dot (slightly larger / brighter than trans-Tasman) -->
              <div
                class="absolute rounded-full"
                :style="{ left: b.xp + '%', top: (TRAVEL_MARKER_Y - 4.5) + 'px', width: '9px', height: '9px', transform: 'translateX(-50%)', backgroundColor: b.region.fill, border: `1.5px solid ${b.region.border}` }"
                :title="`${b.item.label} — ${b.item.route} (${b.item.dates})`"
              ></div>
              <!-- leader line -->
              <div
                class="absolute w-px"
                :style="{ left: b.xp + '%', top: TRAVEL_MARKER_Y + 'px', height: (b.y - TRAVEL_MARKER_Y) + 'px', backgroundColor: b.region.border, opacity: 0.55 }"
              ></div>
              <!-- bubble card -->
              <div
                class="absolute rounded-md px-2.5 py-1.5 border"
                :style="[bubbleStyle(b), { background: 'rgba(192,107,82,0.10)', borderColor: 'rgba(217,138,114,0.42)', boxShadow: '0 2px 10px rgba(0,0,0,0.28)' }]"
              >
                <div class="flex items-center gap-[3px] mb-1 flex-wrap">
                  <img
                    v-for="f in b.flags"
                    :key="f.code"
                    :src="f.src"
                    :alt="f.name"
                    :title="f.name"
                    class="rounded-full shrink-0 ring-1 ring-black/20"
                    width="14" height="14"
                  />
                </div>
                <div class="text-[11.5px] font-semibold leading-tight" :style="{ color: b.region.border }">{{ b.item.label }}</div>
                <div class="text-[9px] text-[#9AA7B3] mt-[3px]">{{ b.item.dates }} · {{ b.item.duration }} · {{ b.item.companions }}</div>
                <div class="text-[8.5px] text-[#7E8C99] leading-snug mt-[2px]">{{ b.countryNames }}</div>
                <div class="text-[8.5px] text-[#7E8C99]">{{ b.item.reason }}</div>
              </div>
            </template>
          </template>

          <!-- blocks -->
          <template v-else>
            <div
              v-for="item in lane.packed"
              :key="item.id"
              class="absolute rounded-[3px] px-2 flex flex-col justify-center overflow-hidden"
              :class="item.kind === 'gap' ? 'border border-dashed' : 'border'"
              :style="blockStyle(lane, item)"
              :title="`${item.label} — ${item.sublabel} (${item.dates}, ${item.location})`"
            >
              <span class="text-[10.5px] font-semibold leading-tight truncate" :style="{ color: item.kind === 'gap' ? lane.border : BLOCK_TEXT }">{{ item.label }}</span>
              <span class="text-[8.5px] leading-tight truncate text-[#F5F2EC]/55">{{ item.dates }}</span>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { lanes, travelRegions, AXIS_START, AXIS_END, PRESENT, RELOCATION, BLOCK_TEXT } from '@/data/clearance/timeline.js'

// Trans-Tasman first, then overseas — used by the legend.
const travelLegend = [travelRegions.tasman, travelRegions.overseas]

// Measured pixel width of the plotting area (travel callout packing needs px to
// reason about label overlap). Defaults sensibly until the ResizeObserver fires.
const trackW = ref(1000)
const plotRef = ref(null)
let ro = null
const measure = () => { if (plotRef.value) trackW.value = plotRef.value.clientWidth }
onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  if (plotRef.value) ro.observe(plotRef.value)
})
onBeforeUnmount(() => ro && ro.disconnect())

// Travel callout / bubble geometry. Trans-Tasman trips render as small 2-line
// callouts (one vertical slot); the Big 3 overseas holidays render as rich
// info bubbles that reserve several slots. Both are packed by the SAME greedy
// packer (`travelLayout`) so a bubble and a callout never overlap, even where
// the 2017/2019 overseas trips sit amongst the trans-Tasman cluster.
const TRAVEL_MARKER_Y = 12   // y of the marker dot / top of every leader line
const TRAVEL_BASE = 22       // y of slot 0
const TRAVEL_STEP = 27       // vertical distance between slots
const TRAVEL_GAP = 12        // min horizontal gap (px) between items sharing slots
const MAX_LABEL = 215        // px cap on trans-Tasman callout width
const BUBBLE_W = 188         // px fixed width of an overseas bubble
const FLAG_BASE = '/images/flags/'

// Axis row height (year labels + ticks). Lanes share the remaining height.
const AXIS_H = 34
const SUBROW_H = 40   // height of one packed sub-row within a lane
const SUBROW_GAP = 6  // vertical gap between sub-rows
const LANE_PAD = 10   // top/bottom padding inside a lane

const span = AXIS_END - AXIS_START

const clamp = (y) => Math.max(AXIS_START, Math.min(AXIS_END, y))
const xPct = (year) => ((clamp(year) - AXIS_START) / span) * 100

// Integer year ticks — labelled only up to the present year. The span past
// PRESENT is intentionally left blank as breathing room.
const ticks = computed(() => {
  const out = []
  for (let y = Math.ceil(AXIS_START); y <= Math.floor(PRESENT); y++) {
    out.push({ year: y, pct: xPct(y) })
  }
  return out
})

const presentPct = computed(() => xPct(PRESENT))
const relocatePct = computed(() => xPct(RELOCATION))

// Era watermarks. The source files are black silhouettes on transparent, so we
// render them as CSS masks and paint the shape with a faint era-tinted fill
// (black-on-dark would be invisible). Files live in public/.
const fernUrl = '/images/project-icons/silver_fern.svg'
const kangarooUrl = '/images/project-icons/kangaroo.png'
function maskStyle(url, tint) {
  return {
    backgroundColor: tint,
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
  }
}

// Greedy row-packing: place each item (sorted by start) into the first sub-row
// where it does not overlap an already-placed item. Returns rows count + items
// tagged with their row index.
function packLane(items) {
  const sorted = [...items].sort((a, b) => a.start - b.start)
  const rowEnds = [] // last end-year per sub-row
  const packed = sorted.map((item) => {
    let row = rowEnds.findIndex((end) => clamp(item.start) >= end - 0.001)
    if (row === -1) {
      row = rowEnds.length
      rowEnds.push(0)
    }
    rowEnds[row] = clamp(item.end)
    return { ...item, row }
  })
  return { packed, rows: Math.max(rowEnds.length, 1) }
}

const packedLanes = computed(() =>
  lanes.map((lane) => {
    const { packed, rows } = packLane(lane.items)
    const rh = lane.rowH || SUBROW_H
    const height = rows * rh + (rows - 1) * SUBROW_GAP + LANE_PAD * 2
    return { ...lane, packed, rows, height }
  })
)

function blockStyle(lane, item) {
  const left = xPct(item.start)
  const width = Math.max(xPct(item.end) - left, 0.6)
  const top = LANE_PAD + item.row * (SUBROW_H + SUBROW_GAP)
  return {
    left: left + '%',
    width: width + '%',
    top: top + 'px',
    height: SUBROW_H + 'px',
    background: item.kind === 'gap' ? 'transparent' : lane.fill,
    borderColor: lane.border,
  }
}

// Estimate a callout's rendered width (px) from its two text lines, so we can
// pack callouts into stagger levels without measuring every DOM node.
function estLabelWidth(line1, line2) {
  const w = Math.max(line1.length * 6.0, line2.length * 5.0) + 8
  return Math.min(w, MAX_LABEL)
}

// Estimate an overseas bubble's rendered height (px) so the packer knows how
// many slots it occupies. Long country lists wrap to a second line.
function estBubbleHeight(item) {
  const n = item.countries ? item.countries.length : 0
  const countryLines = n > 5 ? 2 : 1
  // padding + flag row + title + meta + country line(s) + reason
  return 12 + 16 + 16 + 13 + countryLines * 12 + 12
}

// Unified greedy packer for the travel lane. Every trip is placed left to right
// into the shallowest slot-band where its horizontal span clears everything
// already placed. Small callouts take one slot; rich bubbles take several, so a
// bubble pushes nearby callouts clear of itself rather than colliding.
const travelLayout = computed(() => {
  const lane = lanes.find((l) => l.markers)
  if (!lane) return { tasman: [], bubbles: [] }
  const w = trackW.value
  const levels = [] // each slot: array of occupied [left, right] px spans

  const place = (left, right, slots) => {
    for (let lvl = 0; ; lvl++) {
      let ok = true
      for (let k = 0; k < slots; k++) {
        const occ = levels[lvl + k] || (levels[lvl + k] = [])
        if (occ.some(([l, r]) => !(right + TRAVEL_GAP <= l || left >= r + TRAVEL_GAP))) { ok = false; break }
      }
      if (ok) {
        for (let k = 0; k < slots; k++) levels[lvl + k].push([left, right])
        return lvl
      }
    }
  }

  const enriched = lane.items.map((item) => {
    const region = travelRegions[item.region] || travelRegions.tasman
    const xp = xPct((item.start + item.end) / 2)
    const xpx = (xp / 100) * w
    if (item.region === 'overseas') {
      const flags = (item.countries || []).map((c) => ({ ...c, src: FLAG_BASE + c.code + '.svg' }))
      const countryNames = (item.countries || []).map((c) => c.name).join(' · ')
      const slots = Math.max(2, Math.ceil((estBubbleHeight(item) + 4) / TRAVEL_STEP))
      return { item, region, xp, xpx, width: BUBBLE_W, slots, overseas: true, flags, countryNames }
    }
    const line1 = item.label
    const line2 = `${item.dates} · ${item.route}`
    return { item, region, xp, xpx, width: estLabelWidth(line1, line2), slots: 1, overseas: false, line1, line2 }
  })

  // Placement order matters: trans-Tasman callouts are packed first (left to
  // right) so they claim the shallow slots near the axis, where their short
  // leader lines stay clear of the bubbles. The overseas bubbles then drop in
  // below that whole band, right to left, so Japan (2019) sits above Europe
  // (2017) and Europe lands lowest of all — nothing crosses a bubble. KUL (2011)
  // is isolated and stays shallow on its own.
  const ordered = [
    ...enriched.filter((e) => !e.overseas).sort((a, b) => a.xpx - b.xpx),
    ...enriched.filter((e) => e.overseas).sort((a, b) => b.xpx - a.xpx),
  ]
  const out = ordered.map((e) => {
    let anchor = 'left'
    let left = e.xpx
    let right = e.xpx + e.width
    if (right > w - 6) { anchor = 'right'; left = e.xpx - e.width; right = e.xpx }
    const level = place(left, right, e.slots)
    return { ...e, anchor, y: TRAVEL_BASE + level * TRAVEL_STEP }
  })

  return {
    tasman: out.filter((e) => !e.overseas),
    bubbles: out.filter((e) => e.overseas),
  }
})

const tasmanCallouts = computed(() => travelLayout.value.tasman)
const overseasBubbles = computed(() => travelLayout.value.bubbles)

function calloutStyle(c) {
  const base = { top: c.y + 'px', maxWidth: MAX_LABEL + 'px' }
  if (c.anchor === 'left') {
    base.left = c.xp + '%'
    base.textAlign = 'left'
  } else {
    base.right = (100 - c.xp) + '%'
    base.textAlign = 'right'
  }
  return base
}

function bubbleStyle(b) {
  const base = { top: b.y + 'px', width: BUBBLE_W + 'px' }
  if (b.anchor === 'left') base.left = b.xp + '%'
  else base.right = (100 - b.xp) + '%'
  return base
}
</script>
