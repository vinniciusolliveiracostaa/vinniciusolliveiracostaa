/**
 * Backward-compatible wrapper.
 *
 * The old profile used an atom/orbit asset. The current version generates a
 * professional systems map instead, while keeping this file so older workflows
 * that call scripts/generate-atom.js still work.
 */

require('./generate-system-map');
