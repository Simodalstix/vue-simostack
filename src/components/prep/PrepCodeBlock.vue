<template>
  <div class="text-xs leading-[1.6] font-mono overflow-x-auto">
    <div
      v-for="(line, i) in processedLines"
      :key="i"
      class="whitespace-pre"
      v-html="line || '&nbsp;'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
})

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightLine(raw) {
  if (!raw.trim()) return ''

  // Full-line comment (# label)
  if (/^\s*#/.test(raw)) {
    return `<span class="text-slate-500 font-semibold">${esc(raw)}</span>`
  }

  // Split inline comment: code<2+spaces>#comment
  const m = raw.match(/^(.*?\S)(\s{2,})(#.*)$/)
  const codePart = m ? m[1] : raw
  const gap = m ? m[2] : ''
  const commentPart = m ? m[3] : null

  const highlighted = tokenize(codePart)
  const comment = commentPart
    ? `${gap}<span class="text-slate-500">${esc(commentPart)}</span>`
    : ''

  return highlighted + comment
}

function tokenize(code) {
  // Split into (token, whitespace) pairs, preserving whitespace
  const parts = code.split(/(\s+)/)
  let firstToken = true

  return parts
    .map((tok) => {
      if (!tok) return ''
      if (/^\s/.test(tok)) return tok

      const e = esc(tok)

      if (firstToken) {
        firstToken = false
        return `<span class="text-cyan-400">${e}</span>`
      }

      // Flags: -x, -9, -HUP, --long, --key=val
      if (/^-[\w][\w-]*(=\S*)?$/.test(tok) || /^--[\w][\w-]*(=\S*)?$/.test(tok)) {
        return `<span class="text-yellow-300">${e}</span>`
      }

      // Placeholders <something>
      if (/^<[^>]+>$/.test(tok)) {
        return `<span class="text-amber-400">${e}</span>`
      }

      // Pipe operators
      if (/^\|{1,2}$/.test(tok) || tok === '&&' || tok === '||') {
        return `<span class="text-purple-400">${e}</span>`
      }

      // Absolute paths
      if (/^\//.test(tok)) {
        return `<span class="text-blue-300">${e}</span>`
      }

      return e
    })
    .join('')
}

const processedLines = computed(() => props.code.split('\n').map(highlightLine))
</script>
