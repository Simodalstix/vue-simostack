<template>
  <div class="p-8 min-h-full" ref="containerRef">

    <!-- Heading -->
    <div class="mb-6">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">Life & Career — Positive Vetting</div>
      <h1 class="text-2xl font-bold text-slate-100 mb-3">Timeline</h1>
      <div class="flex items-center gap-5 flex-wrap">
        <div v-for="(cfg, type) in typeConfig" :key="type" class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: cfg.colour }"></span>
          <span class="text-[11px] text-slate-500">{{ cfg.label }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded shrink-0 bg-slate-700/80 border border-slate-600"></span>
          <span class="text-[11px] text-slate-500">Employment block</span>
        </div>
      </div>
    </div>

    <!-- Selected entry detail -->
    <transition name="fade">
      <div v-if="selected"
        class="mb-5 rounded-xl bg-slate-800/80 border border-slate-700 px-5 py-4 flex items-start gap-4"
      >
        <div class="flex gap-1 shrink-0 mt-0.5 flex-wrap max-w-[72px]">
          <FlagIcon v-for="f in (selected.flags || []).slice(0,4)" :key="f" :code="f" size="sm" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1 flex-wrap">
            <span class="text-[11px] font-mono uppercase tracking-widest"
              :style="{ color: typeConfig[selected.type]?.colour }">{{ selected.year }}</span>
            <span class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
              :style="{
                color: typeConfig[selected.type]?.colour,
                borderColor: typeConfig[selected.type]?.colour + '60',
                backgroundColor: typeConfig[selected.type]?.colour + '18',
              }">{{ typeConfig[selected.type]?.label }}</span>
            <span v-if="selected.current"
              class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-300 animate-pulse">
              Current
            </span>
          </div>
          <div class="text-[14px] font-semibold text-slate-100 mb-0.5">{{ selected.label }}</div>
          <div class="text-[12px] text-slate-400 mb-1">{{ selected.sublabel }}</div>
          <div v-if="selected.degree" class="text-[12px] text-purple-300 font-semibold mb-1">🎓 {{ selected.degree }}</div>
          <div v-if="selected.note" class="text-[11px] text-slate-500 italic">{{ selected.note }}</div>
        </div>
        <button @click="selected = null" class="text-slate-600 hover:text-slate-400 text-xl shrink-0 leading-none">×</button>
      </div>
    </transition>

    <!-- ── TIMELINE CANVAS ───────────────────────────────────────────────── -->
    <div class="relative">

      <!-- NZ / Australia background halves — rendered behind everything -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" style="z-index: 0;">
        <!-- NZ half — left of Australia divider -->
        <div class="absolute top-0 bottom-0 left-0"
          :style="{
            width: (BORN_WIDTH + BREAK_WIDTH + ausX) + 'px',
            background: 'linear-gradient(to right, #0f1d2e18, #0f1d2e08)',
          }">
        </div>
        <!-- Australia half — right of divider -->
        <div class="absolute top-0 bottom-0"
          :style="{
            left: (BORN_WIDTH + BREAK_WIDTH + ausX) + 'px',
            right: '0px',
            background: 'linear-gradient(to right, #0a2a1808, #0a2a1818)',
          }">
        </div>
        <!-- Divider line -->
        <div class="absolute top-0 bottom-0 w-px"
          :style="{
            left: (BORN_WIDTH + BREAK_WIDTH + ausX) + 'px',
            background: 'linear-gradient(to bottom, transparent, #22c55e40, #22c55e60, #22c55e40, transparent)',
          }">
        </div>
        <!-- Divider label -->
        <div class="absolute text-[9px] font-semibold uppercase tracking-widest text-emerald-600/70 rotate-90 origin-left"
          style="top: 16px;"
          :style="{ left: (BORN_WIDTH + BREAK_WIDTH + ausX + 6) + 'px' }">
          Australia →
        </div>
      </div>

      <!-- ROW 1: International travel — above spine -->
      <div class="relative mb-0" :style="{ height: ROW_HEIGHT + 'px', zIndex: 1 }">

        <!-- Born anchor -->
        <div class="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
          :style="{ left: '0px', width: BORN_WIDTH + 'px' }">
          <FlagIcon code="nz" size="xs" class="mb-1" />
          <div class="text-[9px] font-mono text-violet-400">1986</div>
          <div class="text-[10px] text-slate-300 font-semibold leading-tight text-center">Born</div>
          <div class="text-[9px] text-slate-500 leading-tight text-center">Christchurch</div>
        </div>

        <!-- Travel entry dots -->
        <template v-for="entry in travelEntries" :key="entry.id">
          <div
            class="absolute flex flex-col items-center cursor-pointer group"
            :style="{
              left: (BORN_WIDTH + BREAK_WIDTH + entryX(entry.yearNum)) + 'px',
              bottom: '0px',
              transform: 'translateX(-50%)',
              width: '104px',
            }"
            @click="selectEntry(entry)"
          >
            <div class="text-center transition-opacity duration-150 pb-1"
              :class="selected?.id === entry.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
              <div class="flex justify-center gap-px mb-0.5 flex-wrap max-w-[96px]">
                <FlagIcon v-for="f in entry.flags.slice(0,5)" :key="f" :code="f" size="xs" />
                <span v-if="entry.flags.length > 5" class="text-[8px] text-slate-500 self-center">+{{ entry.flags.length - 5 }}</span>
              </div>
              <div class="text-[9px] font-mono" :style="{ color: typeConfig[entry.type]?.colour }">{{ entry.year }}</div>
              <div class="text-[10px] text-slate-300 font-medium leading-tight">{{ entry.label }}</div>
            </div>
            <div class="w-px bg-slate-700/50 flex-1" style="min-height: 20px;"></div>
            <div class="w-3 h-3 rounded-full border-2 border-slate-900 shrink-0 transition-transform duration-150"
              :class="selected?.id === entry.id ? 'scale-150' : 'group-hover:scale-125'"
              :style="{
                backgroundColor: entry.highlight ? typeConfig[entry.type]?.colour : typeConfig[entry.type]?.colour + '80',
                boxShadow: entry.highlight ? '0 0 8px ' + typeConfig[entry.type]?.colour : 'none',
              }"
            ></div>
          </div>
        </template>
      </div>

      <!-- SPINE ROW -->
      <div class="relative flex items-center" style="height: 20px; z-index: 1;">

        <!-- Born node -->
        <div class="shrink-0 flex items-center justify-center" :style="{ width: BORN_WIDTH + 'px' }">
          <div class="w-3 h-3 rounded-full border-2 border-slate-900"
            style="background-color: #a78bfa; box-shadow: 0 0 8px #a78bfa80;"></div>
        </div>

        <!-- Discontinuity break -->
        <div class="shrink-0 flex items-center justify-center gap-1"
          :style="{ width: BREAK_WIDTH + 'px' }">
          <div class="h-px flex-1" style="background: #334155;"></div>
          <div class="text-slate-600 font-bold text-[14px] tracking-tighter select-none">╱╱</div>
          <div class="h-px flex-1" style="background: #334155;"></div>
        </div>

        <!-- Main spine line -->
        <div class="relative flex-1 h-0.5" style="background: #334155;">
          <!-- Year tick marks -->
          <div v-for="yr in spineYears" :key="yr"
            class="absolute flex flex-col items-center"
            :style="{ left: entryX(yr) + 'px', transform: 'translateX(-50%)' }"
          >
            <div class="w-px h-2 bg-slate-700" style="margin-top: -1px;"></div>
            <div class="text-[8px] font-mono text-slate-600 mt-0.5">{{ yr }}</div>
          </div>
        </div>

      </div>

      <!-- ROW 2: Education, Employment & Life events — time blocks -->
      <div class="relative" :style="{ height: (ROW_HEIGHT + 20) + 'px', zIndex: 1 }">

        <!-- Life event / financial dots (point-in-time, not blocks) -->
        <template v-for="entry in pointEntries" :key="entry.id">
          <div
            class="absolute flex flex-col items-center cursor-pointer group"
            :style="{
              left: (BORN_WIDTH + BREAK_WIDTH + entryX(entry.yearNum)) + 'px',
              top: '0px',
              transform: 'translateX(-50%)',
              width: '90px',
            }"
            @click="selectEntry(entry)"
          >
            <div class="w-3 h-3 rounded-full border-2 border-slate-900 shrink-0 mt-[-6px] transition-transform duration-150"
              :class="[selected?.id === entry.id ? 'scale-150' : 'group-hover:scale-125', entry.highlight ? '' : '']"
              :style="{
                backgroundColor: entry.highlight ? typeConfig[entry.type]?.colour : typeConfig[entry.type]?.colour + '90',
                boxShadow: entry.highlight ? '0 0 10px ' + typeConfig[entry.type]?.colour : 'none',
              }"
            ></div>
            <div class="w-px bg-slate-700/50" style="height: 12px;"></div>
            <div class="text-center transition-opacity duration-150"
              :class="selected?.id === entry.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
              <div class="text-[9px] font-mono" :style="{ color: typeConfig[entry.type]?.colour }">{{ entry.year }}</div>
              <div class="text-[10px] font-medium leading-tight text-slate-300">{{ entry.label }}</div>
            </div>
          </div>
        </template>

        <!-- Career / education blocks -->
        <template v-for="entry in blockEntries" :key="entry.id">
          <div
            class="absolute cursor-pointer group transition-all duration-150"
            :style="{
              left: (BORN_WIDTH + BREAK_WIDTH + blockX(entry)) + 'px',
              width: Math.max(blockW(entry), 48) + 'px',
              top: entry.type === 'education' ? '8px' : '52px',
              height: '36px',
            }"
            @click="selectEntry(entry)"
          >
            <!-- Block body -->
            <div class="w-full h-full rounded flex items-center px-2 overflow-hidden transition-all duration-150 relative"
              :style="{
                backgroundColor: typeConfig[entry.type]?.colour + (selected?.id === entry.id ? '30' : '18'),
                borderLeft: '3px solid ' + typeConfig[entry.type]?.colour + (selected?.id === entry.id ? '' : '90'),
                opacity: selected?.id === entry.id ? 1 : 0.75,
              }"
            >
              <!-- Degree badge for education entries -->
              <span v-if="entry.type === 'education'" class="text-[11px] mr-1 shrink-0">🎓</span>
              <div class="min-w-0">
                <div class="text-[9px] font-semibold truncate leading-tight"
                  :style="{ color: typeConfig[entry.type]?.colour }">{{ entry.label }}</div>
                <div v-if="entry.sublabel" class="text-[8px] text-slate-500 truncate leading-tight">{{ entry.sublabel }}</div>
              </div>
              <!-- Current pulse -->
              <div v-if="entry.current"
                class="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full animate-pulse"
                :style="{ backgroundColor: typeConfig[entry.type]?.colour }">
              </div>
            </div>
            <!-- Year label below block -->
            <div class="text-[8px] font-mono mt-0.5 text-center"
              :style="{ color: typeConfig[entry.type]?.colour + 'aa' }">{{ entry.year }}</div>
          </div>
        </template>

        <!-- Row labels -->
        <div class="absolute left-0 flex flex-col justify-start gap-0.5"
          :style="{ width: (BORN_WIDTH - 4) + 'px', top: '8px' }">
          <div class="text-[8px] uppercase tracking-widest text-right pr-2 leading-tight"
            style="color: #c084fc; height: 36px; display: flex; align-items: center; justify-content: flex-end;">
            Education
          </div>
          <div class="text-[8px] uppercase tracking-widest text-right pr-2 leading-tight"
            style="color: #f97316; height: 36px; display: flex; align-items: center; justify-content: flex-end; margin-top: 8px;">
            Employment
          </div>
        </div>

      </div>

      <!-- ROW 3: Addresses — range bars -->
      <div class="relative mt-4" :style="{ height: '80px', zIndex: 1 }">
        <div class="absolute left-0 top-0 flex items-center" :style="{ width: BORN_WIDTH + 'px', height: '80px' }">
          <div class="text-[9px] uppercase tracking-widest text-slate-600 font-semibold leading-tight text-right w-full pr-2">
            Addresses
          </div>
        </div>

        <!-- Pre-break bar -->
        <div class="absolute rounded h-6 flex items-center px-2 overflow-hidden cursor-pointer transition-opacity duration-150"
          style="top: 8px;"
          :style="{
            left: '4px',
            width: (BORN_WIDTH - 8) + 'px',
            backgroundColor: addressStatusConfig['approximate'].colour + '28',
            borderLeft: '3px solid ' + addressStatusConfig['approximate'].colour + '80',
            opacity: 0.55,
          }"
          @click="selectedAddr = selectedAddr?.id === 'addr-christchurch-parents' ? null : addressHistory[0]"
        >
          <span class="text-[9px] text-slate-400 truncate">Parents · Christchurch</span>
        </div>

        <!-- Spine-aligned address bars -->
        <template v-for="addr in spineAddresses" :key="addr.id">
          <div
            class="absolute rounded h-6 flex items-center px-2 overflow-hidden cursor-pointer transition-all duration-150"
            :style="{
              top: '8px',
              left: (BORN_WIDTH + BREAK_WIDTH + barX(addr.yearStart)) + 'px',
              width: Math.max(barW(addr.yearStart, addr.yearEnd), 40) + 'px',
              backgroundColor: addressStatusConfig[addr.status].colour + '22',
              borderLeft: '3px solid ' + addressStatusConfig[addr.status].colour,
              opacity: selectedAddr?.id === addr.id ? 1 : 0.7,
            }"
            @click="selectedAddr = selectedAddr?.id === addr.id ? null : addr"
          >
            <FlagIcon :code="addr.flags[0]" size="xs" class="shrink-0 mr-1" />
            <span class="text-[9px] text-slate-400 truncate">{{ addr.address }}</span>
          </div>
        </template>

        <!-- Address detail popup -->
        <transition name="fade">
          <div v-if="selectedAddr"
            class="absolute rounded-lg border px-3 py-2 text-[11px] z-20 max-w-xs shadow-xl"
            :class="addressStatusConfig[selectedAddr.status].bg + ' ' + addressStatusConfig[selectedAddr.status].border"
            style="top: 42px; left: 200px;"
          >
            <div class="font-semibold text-slate-200 mb-0.5">{{ selectedAddr.address }}</div>
            <div class="text-slate-500 mb-1">{{ selectedAddr.period }} · {{ selectedAddr.type }}</div>
            <div class="text-slate-500 italic leading-snug">{{ selectedAddr.note }}</div>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-[9px] px-1.5 py-0.5 rounded-full border font-semibold uppercase tracking-wide"
                :class="addressStatusConfig[selectedAddr.status].text + ' ' + addressStatusConfig[selectedAddr.status].border"
                :style="{ backgroundColor: addressStatusConfig[selectedAddr.status].colour + '20' }"
              >{{ addressStatusConfig[selectedAddr.status].label }}</span>
              <button @click="selectedAddr = null" class="text-slate-600 hover:text-slate-400 text-base leading-none ml-3">×</button>
            </div>
          </div>
        </transition>

        <div class="absolute text-[9px] text-sky-700/70 italic"
          :style="{ bottom: '2px', left: (BORN_WIDTH + BREAK_WIDTH + 4) + 'px' }">
          NZ addresses: statutory declaration accepted where documentary evidence unavailable
        </div>
      </div>

      <!-- ROW 4: NZ visits -->
      <div class="relative mt-6" style="height: 56px; z-index: 1;">
        <div class="absolute left-0 top-0 flex items-center" :style="{ width: BORN_WIDTH + 'px', height: '56px' }">
          <div class="text-[9px] uppercase tracking-widest font-semibold text-right w-full pr-2 leading-tight"
            style="color: #34d399;">
            New Zealand<br><span class="text-slate-600 normal-case tracking-normal font-normal">birth country</span>
          </div>
        </div>

        <!-- Pre-break childhood bar -->
        <div class="absolute rounded h-7 flex items-center px-2 overflow-hidden"
          style="top: 12px; background-color: #34d39928; border-left: 3px solid #34d39980; opacity: 0.5;"
          :style="{ left: '4px', width: (BORN_WIDTH - 8) + 'px' }"
        >
          <FlagIcon code="nz" size="xs" class="shrink-0 mr-1" />
          <span class="text-[9px]" style="color: #34d399;">Childhood home</span>
        </div>

        <!-- NZ visit bars -->
        <template v-for="visit in spineNzVisits" :key="visit.id">
          <div
            class="absolute rounded h-7 flex items-center px-2 overflow-hidden cursor-pointer transition-all duration-150"
            :style="{
              top: '12px',
              left: (BORN_WIDTH + BREAK_WIDTH + barX(visit.yearStart)) + 'px',
              width: Math.max(barW(visit.yearStart, visit.yearEnd), 36) + 'px',
              backgroundColor: '#34d39922',
              borderLeft: '3px solid #34d399',
              opacity: selectedNZ?.id === visit.id ? 1 : 0.55,
            }"
            @click="selectedNZ = selectedNZ?.id === visit.id ? null : visit"
          >
            <FlagIcon code="nz" size="xs" class="shrink-0 mr-1" />
            <span class="text-[9px] text-emerald-400 truncate">{{ visit.label }}</span>
          </div>
        </template>
      </div>

      <!-- NZ detail -->
      <transition name="fade">
        <div v-if="selectedNZ"
          class="mt-2 rounded-lg bg-emerald-950/30 border border-emerald-800/50 px-4 py-2.5 text-[11px]"
          style="position: relative; z-index: 1;"
        >
          <div class="font-semibold text-slate-200 mb-0.5">{{ selectedNZ.label }} · {{ selectedNZ.year }}</div>
          <div class="text-slate-400">{{ selectedNZ.sublabel }}</div>
          <div v-if="selectedNZ.note" class="text-slate-500 italic mt-0.5">{{ selectedNZ.note }}</div>
        </div>
      </transition>

    </div><!-- end canvas -->

    <p class="text-[10px] text-slate-600 mt-6 italic">
      Click any entry for detail. ╱╱ indicates discontinuity — childhood years 1986–2005 abbreviated.
      PV requires full history since age 16 (~2002).
    </p>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  timelineEntries, nzVisits, addressHistory,
  typeConfig, addressStatusConfig,
  SPINE_START, SPINE_END,
} from '@/data/clearance/timeline.js'
import FlagIcon from './FlagIcon.vue'

// ── Layout constants ──────────────────────────────────────────────────────────
const BORN_WIDTH  = 100
const BREAK_WIDTH = 64
const ROW_HEIGHT  = 160
const PADDING     = 56   // right breathing room

// ── Fluid spine width via ResizeObserver ──────────────────────────────────────
const containerRef = ref(null)
const spineWidth   = ref(900)

let ro = null
onMounted(() => {
  const measure = () => {
    if (!containerRef.value) return
    const available = containerRef.value.clientWidth - BORN_WIDTH - BREAK_WIDTH - PADDING
    spineWidth.value = Math.max(available, 600)
  }
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(containerRef.value)
})
onBeforeUnmount(() => ro?.disconnect())

// ── Position helpers ──────────────────────────────────────────────────────────
const spineYears = computed(() => {
  const years = []
  for (let y = SPINE_START; y <= SPINE_END; y += 2) years.push(y)
  return years
})

function entryX(year) {
  const clamped = Math.max(SPINE_START, Math.min(SPINE_END, year))
  return ((clamped - SPINE_START) / (SPINE_END - SPINE_START)) * spineWidth.value
}

function barX(yearStart) {
  return entryX(Math.max(yearStart, SPINE_START))
}

function barW(yearStart, yearEnd) {
  const s = Math.max(yearStart, SPINE_START)
  const e = Math.min(yearEnd, SPINE_END)
  return ((e - s) / (SPINE_END - SPINE_START)) * spineWidth.value
}

// Block entries have yearEnd, point entries are single moments
function blockX(entry) {
  return entryX(entry.yearNum)
}

function blockW(entry) {
  if (!entry.yearEnd) return 56
  const s = Math.max(entry.yearNum, SPINE_START)
  const e = Math.min(entry.yearEnd, SPINE_END)
  return ((e - s) / (SPINE_END - SPINE_START)) * spineWidth.value
}

// Australia divider X position (2013)
const ausX = computed(() => entryX(2013))

// ── Entry classification ──────────────────────────────────────────────────────
// Blocks: career and education entries (have duration)
const blockEntries = computed(() =>
  timelineEntries.filter(e => e.lane === 'career' && (e.type === 'career' || e.type === 'education'))
)
// Points: life events, financial milestones (single moment)
const pointEntries = computed(() =>
  timelineEntries.filter(e => e.lane === 'career' && (e.type === 'life' || e.type === 'financial'))
)
const travelEntries = computed(() => timelineEntries.filter(e => e.lane === 'travel'))

const spineAddresses = computed(() => addressHistory.filter(a => !a.preBreak && a.yearEnd >= SPINE_START))
const spineNzVisits  = computed(() => nzVisits.filter(v => !v.preBreak && v.yearEnd >= SPINE_START))

// ── Selection state ───────────────────────────────────────────────────────────
const selected     = ref(null)
const selectedAddr = ref(null)
const selectedNZ   = ref(null)

function selectEntry(entry) {
  selected.value = selected.value?.id === entry.id ? null : entry
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s, transform 0.12s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-3px); }
</style>
