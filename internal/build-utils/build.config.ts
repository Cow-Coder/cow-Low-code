import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
