const maxMBToTest = 20;

export const getStorageSize = () => {
  // fill up all data in local storage to see how much we can squeeze in
  localStorage.clear();
  let i = 0,
    storeSpace = 0;
  let testPacket = new Array(1025).join("a"); // create 1024 characters so 1KB
  while (i < maxMBToTest) {
    // MB level
    console.log("1.getStorageSize verify : " + i + "Mb");
    let t = 0;
    while (t < 1025) {
      // KB level
      try {
        localStorage.setItem(i + "|" + t, testPacket);
      } catch (error) {
        let kbsaved = Math.floor(t / 1024 * 100); // calculate percentage of 1024
        storeSpace = i + "." + kbsaved; // add MB and KB values
        storeSpace = Math.floor(storeSpace * 100) / 100; // rounds down the value
        t = 1025;
        i = maxMBToTest + 1;
      }
      t++;
    }
    i++;
  }
  console.log("1.getStorageSize Space Available = " + storeSpace + "Mb");
  localStorage.clear(); // clear all local storage
  localStorage.setItem("storeSpace", storeSpace); // store this value
};
