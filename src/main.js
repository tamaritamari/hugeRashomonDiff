const Diff = require('diff');
const fs = require('fs');

const readFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      return err ? rej(err) : res(data);
    });
  })
}
const writeFile = (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, 'utf-8', (err, data) => {
      return err ? rej(err) : res(data);
    });
  })
}

(async () => {
  const normal = await readFile("./normal.txt");
  const enlarged = await readFile("./enlarged.txt");
  const diff = Diff.diffChars(normal, enlarged);

  const html = diff.map((part) => {
    return part.added ? `<span class="attention">${part.value}</span>` :
      part.removed ? `<span class="domain">${part.value}</span>` :  part.value.split("\n").map(v => `<span>${v}</span>`).join("<br>");
  }).join('');
  try {
    await writeFile('hoge.html', html)
  }catch(err){
    console.log(err)
  }
})()