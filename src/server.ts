import { IgApiClient } from "instagram-private-api";
import { ids } from "./ids";
const ig = new IgApiClient();

ig.state.generateDevice(`iphone`); // you can put any value here

(async () => {
  await ig.simulate.preLoginFlow();
  console.log(await ig.account.login("xxxxx", "xxxxx"));
  console.log("logged in")
  for (let i = 7500; i < ids.length; i += 1) {
    const sliced = ids.slice(i, i+1);
    console.log(sliced)
    await ig.friendship.setBesties({ add: sliced }).catch((error:any) =>{
        console.log(error)
        console.log("error");
    });

    //wait between 5 and 10 seconds
    const randomTime =  Math.random() * 10000 + 5000;
    console.log('waiting', randomTime, 'ms');  
    await new Promise((resolve) => setTimeout(resolve, randomTime));
    console.log("added", i+1, "besties")
  }
})();
