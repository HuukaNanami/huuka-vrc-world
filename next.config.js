/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的ファイルを出力
  assetPrefix: './', // 相対パスを使用
  images: {
    unoptimized: true, // 画像最適化を無効化（GitHub Pages対応のため）
  },
};

module.exports = nextConfig;
