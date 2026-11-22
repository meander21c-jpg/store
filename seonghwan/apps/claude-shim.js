/* 깃허브 홈페이지용 대체 기능
   Claude 앱(claude.ai)에서 쓰던 기능 중 '파일 저장(downloads)'만 일반 브라우저 다운로드로 대신합니다.
   AI 기능(sample)·받아쓰기 등은 claude.ai 안에서만 되므로 여기서는 '없음'으로 처리해
   각 앱이 직접 입력 모드로 동작하게 합니다. */
(function(){
  if (window.claude && window.claude.use) return;
  function saveFile(o){
    return new Promise(function(res, rej){
      try{
        var data = o && o.data;
        var blob = (data instanceof Blob) ? data : new Blob([data == null ? '' : data], {type: (o && o.mimeType) || 'application/octet-stream'});
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (o && o.filename) || 'download';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function(){ URL.revokeObjectURL(a.href); }, 60000);
        res({ok:true});
      }catch(e){ rej(e); }
    });
  }
  window.claude = {
    shim: true,
    use: function(name){
      if (name === 'downloads') return Promise.resolve({ save: saveFile });
      return Promise.resolve(null);
    }
  };
})();
