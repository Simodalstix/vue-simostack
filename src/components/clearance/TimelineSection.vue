<template>
  <div class="p-5 min-h-full overflow-x-auto">

    <!-- Heading -->
    <div class="mb-8">
      <div class="text-[10px] uppercase tracking-widest text-sky-400 font-semibold mb-1">Life & Career</div>
      <h1 class="text-2xl font-bold text-slate-100 mb-3">Timeline</h1>
      <!-- Legend -->
      <div class="flex items-center gap-5 flex-wrap">
        <div v-for="(cfg, type) in typeConfig" :key="type" class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: cfg.colour }"></span>
          <span class="text-[11px] text-slate-500">{{ cfg.label }}</span>
        </div>
      </div>
    </div>

    <!-- Timeline container -->
    <div class="relative" style="min-width: 1200px;">

      <!-- Selected entry detail panel -->
      <transition name="fade">
        <div v-if="selected"
          class="mb-6 rounded-xl bg-slate-800/80 border border-slate-700 px-5 py-4 flex items-start gap-4"
        >
          <div class="flex flex-wrap gap-1 shrink-0 mt-0.5" style="max-width: 132px;">
            <FlagIcon v-for="f in selected.flags" :key="f" :code="f" size="md" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1">
              <span class="text-[10px] font-mono uppercase tracking-widest"
                :style="{ color: typeConfig[selected.type]?.colour }">
                {{ selected.year }}
              </span>
              <span class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border text-[11px]"
                :style="{
                  color: typeConfig[selected.type]?.colour,
                  borderColor: typeConfig[selected.type]?.colour + '60',
                  backgroundColor: typeConfig[selected.type]?.colour + '18',
                }">
                {{ typeConfig[selected.type]?.label }}
              </span>
            </div>
            <div class="text-[14px] font-semibold text-slate-100 mb-0.5">{{ selected.label }}</div>
            <div class="text-[12px] text-slate-400 mb-1">{{ selected.sublabel }}</div>
            <div v-if="selected.note" class="text-[12px] text-slate-500 italic">{{ selected.note }}</div>
          </div>
          <button @click="selected = null" class="text-slate-600 hover:text-slate-400 text-[18px] shrink-0">×</button>
        </div>
      </transition>

      <!-- ABOVE lane (travel & life events) -->
      <div class="flex items-end" style="height: 160px; gap: 0;">
        <template v-for="entry in aboveEntries" :key="entry.id">
          <!-- Invisible spacer — empty, or a divider line if this entry is a divider -->
          <div v-if="entry.invisible"
            class="flex-1 flex flex-col items-center"
            :class="entry.divider ? 'pointer-events-none' : ''"
          >
            <div v-if="entry.divider" class="flex-1 w-px"
              :style="{ backgroundColor: typeConfig[entry.type]?.colour + '40' }"
            ></div>
          </div>

          <!-- Divider entry — card at top, connector fills full lane height -->
          <div v-else-if="entry.divider"
            class="flex-1 flex flex-col items-center pt-2 cursor-pointer group"
            @click="selected = selected?.id === entry.id ? null : entry"
          >
            <div
              class="w-[130px] text-center transition-all duration-150"
              :class="selected?.id === entry.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'"
            >
              <div class="flex flex-wrap justify-center gap-0.5 mb-1">
                <FlagIcon v-for="f in entry.flags" :key="f" :code="f" size="xs" />
              </div>
              <div class="text-[10px] font-mono" :style="{ color: typeConfig[entry.type]?.colour }">{{ entry.year }}</div>
              <div class="text-[11px] text-slate-100 leading-tight font-semibold">{{ entry.label }}</div>
            </div>
            <div class="w-px mt-2 flex-1"
              :style="{
                backgroundColor: typeConfig[entry.type]?.colour + '60',
                boxShadow: `0 0 6px ${typeConfig[entry.type]?.colour}40`,
              }"
            ></div>
            <div class="w-3 h-3 rounded-full border-2 border-slate-900 shrink-0 transition-transform duration-150"
              :class="selected?.id === entry.id ? 'scale-150' : 'group-hover:scale-125'"
              :style="{
                backgroundColor: typeConfig[entry.type]?.colour,
                boxShadow: `0 0 10px ${typeConfig[entry.type]?.colour}`,
              }"
            ></div>
          </div>

          <!-- Normal visible above entry -->
          <div v-else
            class="flex-1 flex flex-col items-center justify-end pb-2 cursor-pointer group"
            @click="selected = selected?.id === entry.id ? null : entry"
          >
            <div
              class="w-[130px] text-center transition-all duration-150"
              :class="selected?.id === entry.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'"
            >
              <div class="flex flex-wrap justify-center gap-0.5 mb-1">
                <FlagIcon v-for="f in entry.flags" :key="f" :code="f" size="xs" />
              </div>
              <div class="text-[10px] font-mono" :style="{ color: typeConfig[entry.type]?.colour }">{{ entry.year }}</div>
              <div class="text-[11px] text-slate-300 leading-tight font-medium">{{ entry.label }}</div>
            </div>
            <div class="w-px mt-2 flex-1"
              :style="{ backgroundColor: typeConfig[entry.type]?.colour + '60', minHeight: '20px', maxHeight: '60px' }"
            ></div>
            <div class="w-3 h-3 rounded-full border-2 border-slate-900 shrink-0 transition-transform duration-150"
              :class="selected?.id === entry.id ? 'scale-150' : 'group-hover:scale-125'"
              :style="{
                backgroundColor: entry.highlight ? typeConfig[entry.type]?.colour : typeConfig[entry.type]?.colour + '80',
                boxShadow: entry.highlight ? `0 0 8px ${typeConfig[entry.type]?.colour}` : 'none',
              }"
            ></div>
          </div>
        </template>
      </div>

      <!-- Spine line -->
      <div class="h-0.5 bg-slate-700 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-700 via-sky-800/40 to-slate-700"></div>
      </div>

      <!-- BELOW lane (career & education) -->
      <div class="flex items-start" style="gap: 0;">
        <template v-for="entry in belowEntries" :key="entry.id">
          <!-- Invisible spacer — empty, or divider line extending through below lane -->
          <div v-if="entry.invisible"
            class="flex-1 flex flex-col items-center"
          >
            <div v-if="entry.divider" class="flex-1 w-px"
              :style="{
                backgroundColor: typeConfig[entry.type]?.colour + '40',
                boxShadow: `0 0 6px ${typeConfig[entry.type]?.colour}30`,
              }"
            ></div>
          </div>

          <!-- Visible below entry -->
          <div v-else
            class="flex-1 flex flex-col items-center cursor-pointer group"
            @click="selected = selected?.id === entry.id ? null : entry"
          >
            <div class="w-3 h-3 rounded-full border-2 border-slate-900 shrink-0 mt-[-6px] transition-transform duration-150"
              :class="[
                selected?.id === entry.id ? 'scale-150' : 'group-hover:scale-125',
                entry.current ? 'animate-pulse' : '',
              ]"
              :style="{
                backgroundColor: entry.current ? typeConfig[entry.type]?.colour : typeConfig[entry.type]?.colour + '80',
                boxShadow: entry.current ? `0 0 10px ${typeConfig[entry.type]?.colour}` : 'none',
              }"
            ></div>
            <div class="w-px" :style="{ backgroundColor: typeConfig[entry.type]?.colour + '60', height: '20px' }"></div>
            <div
              class="max-w-[130px] text-center pt-1 transition-all duration-150"
              :class="selected?.id === entry.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'"
            >
              <div class="flex flex-wrap justify-center gap-0.5 mb-0.5">
                <FlagIcon v-for="f in entry.flags" :key="f" :code="f" size="xs" />
              </div>
              <div class="text-[10px] font-mono" :style="{ color: typeConfig[entry.type]?.colour }">
                {{ entry.year }}
              </div>
              <div class="text-[11px] leading-tight font-medium"
                :class="entry.current ? 'text-sky-300' : 'text-slate-300'"
              >{{ entry.label }}</div>
            </div>
          </div>
        </template>
      </div>

      <!-- Empty spacers to align above/below columns -->
      <!-- The above and below rows are keyed to the full entry list so they align on the same x axis -->

    </div>

    <!-- Alignment note -->
    <p class="text-[10px] text-slate-600 mt-6 italic">Click any entry for detail. Entries above the spine: travel and life events. Below: career and education.</p>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { timelineEntries, typeConfig } from '@/data/clearance/timeline.js'
import FlagIcon from './FlagIcon.vue'

const selected = ref(null)

// Build parallel arrays for above/below, maintaining same column count
// so dots align on the spine. Entries that appear in one lane get an
// invisible placeholder in the other.

const aboveEntries = computed(() =>
  timelineEntries.map(e => e.lane === 'above' ? e : { ...e, invisible: true })
)

const belowEntries = computed(() =>
  timelineEntries.map(e => e.lane === 'below' ? e : { ...e, invisible: true })
)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
