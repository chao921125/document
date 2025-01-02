const version = "6_6_0";
const file = "dmg";
const maxNum = 10999;
let num = 10000;

function getUrl() {
    if (num > maxNum) { return false; }
    let url = `https://lf3-package.vlabstatic.com/obj/faceu-packages/Jianying_${version}_${num}_jianyingpro_0_creatortool.${file}`;
    fetch(url).then(res => {
        if (res.ok) {
            console.log("success", url);
        } else {
            console.log("error", num);
        }
        num += 1;
        getUrl();
    });
}

getUrl();