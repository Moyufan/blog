把你想在博客里播放的 mp3 文件放到这个目录，例如：

  public/music/my-favorite.mp3

然后打开 src/data/playlist.ts，添加一项：

  {
    title: "歌曲名",
    artist: "歌手名",
    src: "/music/my-favorite.mp3",
    cover: "/images/notebook.png",  // 可选
  }

保存后重新部署即可。sample-ambient.wav 是自带的示例音，可以删除，
但删除前记得把 playlist.ts 里对应的那一项也删掉。
