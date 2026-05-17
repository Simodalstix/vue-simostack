<template>
  <div style="height: 100%; overflow: auto; padding: 16px 20px; background: #0f172a; font-family: ui-monospace, monospace;">

    <!-- Matrix + floating overlay cards -->
    <div style="position: relative;">

      <!-- Career map grid -->
      <div :style="gridStyle">

        <!-- Header row: empty label cell + question headers -->
        <div />
        <div
          v-for="(q, qi) in careerQuestions"
          :key="'h' + qi"
          :style="headerCellStyle(qi)"
        >
          <span style="font-size: 12px; color: #94a3b8; letter-spacing: 0.03em; line-height: 1.35;">
            {{ q.label }}
          </span>
        </div>

        <!-- Block rows -->
        <template v-for="block in careerBlocks" :key="block.id">

          <!-- Block label -->
          <div :style="{
            display: 'flex',
            alignItems: 'center',
            paddingRight: '8px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.07em',
            color: block.color,
            opacity: '0.85',
            userSelect: 'none',
          }">
            {{ block.short }}
          </div>

          <!-- Question cells -->
          <template v-for="(q, qi) in careerQuestions" :key="block.id + '-' + qi">

            <!-- Active -->
            <div
              v-if="getCellType(block.id, qi) === 'active'"
              :style="{
                background: block.color + '21',
                borderLeft: '3px solid ' + block.color + 'b3',
                borderRadius: '6px',
                padding: '6px 6px 6px 7px',
              }"
            >
              <div
                v-for="(anchor, ai) in q.blockAnchors[block.id]"
                :key="ai"
                :style="{
                  fontSize: '12px',
                  color: '#cbd5e1',
                  lineHeight: '1.45',
                  marginBottom: ai < q.blockAnchors[block.id].length - 1 ? '3px' : '0',
                }"
              >
                <span style="color: #475569; margin-right: 3px;">›</span>{{ anchor }}
              </div>
            </div>

            <!-- Bridge -->
            <div
              v-else-if="getCellType(block.id, qi) === 'bridge'"
              style="display: flex; align-items: center;"
            >
              <div :style="{ height: '1.5px', width: '100%', background: block.color, opacity: '0.18' }" />
            </div>

            <!-- Empty -->
            <div v-else />

          </template>
        </template>
      </div>

      <!-- Overlay card: upper-right dead space (TRANSITION row, cols 3–5 are empty) -->
      <div style="position: absolute; top: 70px; right: 0; width: 31%; z-index: 10;">
        <div style="padding: 10px 12px; border: 1px dashed #334155; border-radius: 6px; background: #0f172a;">
          <div style="font-size: 10px; font-weight: 700; color: #64748b; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 7px;">
            {{ standaloneItems[0].label }}
          </div>
          <div
            v-for="(anchor, ai) in standaloneItems[0].anchors"
            :key="ai"
            style="font-size: 11px; color: #64748b; line-height: 1.45; margin-bottom: 3px;"
          >
            <span style="opacity: 0.45; margin-right: 3px;">›</span>{{ anchor }}
          </div>
        </div>
      </div>

      <!-- Overlay card: lower-left dead space (CURIOUS + TEAMMATE rows, cols 0–1 are empty) -->
      <div style="position: absolute; bottom: 0; left: 92px; width: 27%; z-index: 10;">
        <div style="padding: 10px 12px; border: 1px dashed #334155; border-radius: 6px; background: #0f172a;">
          <div style="font-size: 10px; font-weight: 700; color: #64748b; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 7px;">
            {{ standaloneItems[1].label }}
          </div>
          <div
            v-for="(anchor, ai) in standaloneItems[1].anchors"
            :key="ai"
            style="font-size: 11px; color: #64748b; line-height: 1.45; margin-bottom: 3px;"
          >
            <span style="opacity: 0.45; margin-right: 3px;">›</span>{{ anchor }}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { careerBlocks, careerQuestions, standaloneItems } from '@/data/prep/careerMapData.js'

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: `88px repeat(${careerQuestions.length}, 1fr)`,
  rowGap: '2px',
  columnGap: '0',
}

function primaryColor(qi) {
  const q = careerQuestions[qi]
  for (const block of careerBlocks) {
    if (q.blockAnchors[block.id]?.length) return block.color
  }
  return '#22d3ee'
}

function headerCellStyle(qi) {
  const color = primaryColor(qi)
  return {
    borderBottom: `1.5px solid ${color}`,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '6px 6px 6px 6px',
    textAlign: 'center',
  }
}

function getCellType(blockId, qIdx) {
  const activeIdxs = careerQuestions
    .map((q, i) => (q.blockAnchors[blockId]?.length ? i : -1))
    .filter(i => i !== -1)
  if (!activeIdxs.length) return 'empty'
  if (careerQuestions[qIdx].blockAnchors[blockId]?.length) return 'active'
  const mn = Math.min(...activeIdxs), mx = Math.max(...activeIdxs)
  return (qIdx > mn && qIdx < mx) ? 'bridge' : 'empty'
}
</script>
