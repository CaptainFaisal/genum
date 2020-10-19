const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2, 4);
const generateNumbers = (digit) => {
  const numberOfZeros = (n) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      s += "0";
    }
    return s;
  };
  let nums = "";
  for (let i = 0; i < Math.pow(10, digit); i++) {
    nums += `${numberOfZeros(
      digit -
        (i == 0 || i == 1
          ? 1
          : i % 10 == 0
          ? Math.log10(i) + 1
          : Math.ceil(Math.log10(i)))
    )}${i}\n`;
  }
  return nums;
};
if ((args.length === 1) & (args[0]?args[0].toLowerCase() === "help":false)) {
  console.log(
    `node ${path.basename(__filename)} [file name] [number of digits].`
  );
} else if (args.length === 2) {
  if (parseInt(args[1]) !== NaN) {
    fs.writeFile(`${args[0]}.txt`, generateNumbers(parseInt(args[1])), (e) =>
      console.log(e?e:"The txt file has been written successfully.")
    );
  } else {
    console.log("Last arg should be a valid number.");
  }
} else {
  console.log(`Write "node ${path.basename(__filename)} help" for info.`);
}
