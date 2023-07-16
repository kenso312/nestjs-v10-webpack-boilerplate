/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { IgnorePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const SwcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: './src/main',
  externals: {},
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: { ...SwcDefaultConfig },
        },
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },
  plugins: [
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@fastify/static',
          '@fastify/view',
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/platform-express',
          '@nestjs/websockets/socket-module',
          'amqp-connection-manager',
          'amqplib',
          'cache-manager',
          'cache-manager/package.json',
          'class-transformer/storage',
          'hbs',
          'ioredis',
          'kafkajs',
          'mqtt',
          'nats',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, { paths: [process.cwd()] });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['main'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
  },
  target: 'node',
};
