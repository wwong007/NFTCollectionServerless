// WEBPACK DEPENDENCY
const path = require('path');

// PATHS
const SOURCE_PATH = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, 'build/commonjs/dist');
console.log('DIST_PATH', DIST_PATH);

// STACK PATH
const STACK_PATH = path.resolve(SOURCE_PATH, 'stacks/');
const NFT_COLLECTION_PATH = path.resolve(STACK_PATH, 'NFTCollection/');

console.log('Adding logging');

module.exports = {
  entry: {
    GetNFTCollection: path.resolve(NFT_COLLECTION_PATH, 'features/GetNFTCollection/GetNFTCollection.ts'),
    AddNFT: path.resolve(NFT_COLLECTION_PATH, 'features/AddNFT/AddNFT.ts')
  },
  output: {
    path: path.resolve(DIST_PATH),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      aws: path.resolve(SOURCE_PATH, 'aws'),
      database: path.resolve(SOURCE_PATH, 'database'),
      errors: path.resolve(SOURCE_PATH, 'errors'),
      lib: path.resolve(__dirname, 'lib'),
      models: path.resolve(SOURCE_PATH, 'database/models'),
      // STACK PATHS
      stacks: STACK_PATH,
      // TESTING
      tests: path.resolve(SOURCE_PATH, 'tests'),
      utils: path.resolve(SOURCE_PATH, 'utils'),
      validation: path.resolve(SOURCE_PATH, 'validation'),
      NFTCollection: NFT_COLLECTION_PATH
    }
  },
  mode: 'production'
}