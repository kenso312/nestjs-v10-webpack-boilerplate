/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { IgnorePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve('src', 'main'),
  target: 'node',
  externals: {},
  module: { rules: [{ test: /\.ts$/, loader: 'ts-loader' }] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
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
    new ForkTsCheckerWebpackPlugin(),
  ],
};
