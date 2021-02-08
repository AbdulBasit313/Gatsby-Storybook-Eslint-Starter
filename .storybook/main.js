module.exports = {
  // You will want to change this to wherever your Stories will live.
  stories: ['../src/**/*.stories.js'],
  addons: [
    // '@storybook/preset-scss',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.filter((rule) => {
      const ruleTestStr = rule.test.toString()
      return (
        ruleTestStr !== '/\\.css$/' &&
        ruleTestStr !==
          '/\\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\\?.*)?$/'
      )
    })
    config.module.rules = config.module.rules.filter(
      (rule) => rule.test.toString() !== '/\\.css$/'
    )

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    })

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true, // Enable modules to help you using className
          },
        },
      ],
    })
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader')
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-proposal-class-properties'),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve('babel-plugin-remove-graphql-queries'),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main']
    return config
  },
}
