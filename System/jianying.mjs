import ProgressBar from "../NodeJS/demo.mjs";

const version = "5_4_0";
const file = "exe";
const maxNum = 9999;
let num = 10;

let bar = new ProgressBar(':bar', { total: maxNum });
function getUrl() {
    bar.tick();
    if (num > maxNum) { return false; }
    // let url = `https://lf3-package.vlabstatic.com/obj/faceu-packages/Jianying_${version}_${num}_jianyingpro_0_creatortool.${file}`;
    let url = `https://lf16-capcut.faceulv.com/obj/capcutpc-packages-us/packages/CapCut_${version}_${num}_capcutpc_0_creatortool.${file}`;
    fetch(url).then(res => {
        if (res.ok) {
            console.log("success", url);
        }
        num += 1;
        getUrl();
    });
}

getUrl();