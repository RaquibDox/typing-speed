const paragraphs = [
  "The time to take action was now. All three men knew in their hearts this was the case, yet none of them moved a muscle to try. They were all watching and waiting for one of the others to make the first move so they could follow a step or two behind and help. The situation demanded a leader and all three men were followers.",
  "She had been told time and time again that the most important steps were the first and the last. It was something that she carried within her in everything she did, but then he showed up and disrupted everything. He told her that she had it wrong. The first step wasn't the most important. The last step wasn't the most important. It was the next step that was the most important.",
  "Was it a whisper or was it the wind? He wasn't quite sure. He thought he heard a voice but at this moment all he could hear was the wind rustling the leaves of the trees all around him. He stopped and listened more intently to see if he could hear the voice again. Nothing but the wind rustling the leaves could be heard. He was about to continue his walk when he felt a hand on his shoulder, and he quickly turned to see who it was. There was nobody there, but he heard the voice again.",
  "“Ingredients for life,” said the backside of the truck. They mean food, but really food is only 1 ingredient of life. Life has so many more ingredients such as pain, happiness, laughter, joy, tears, and smiles. Life also has hard work, easy play, sleepless nights, and sunbathing by the ocean. Love, hatred, envy, self-assurance, and fear could be just down aisle 3 ready to be bought when needed. How I wish I could pull ingredients like these off shelves in a store.",
  "Mary had to make a decision and she knew that whatever decision she made, it would upset someone. It seemed like such a silly reason for people to get upset but she knew the minute that she began to consider doing it that there was no way everyone in her life would be pleased with what she ultimately decided to do. It was simply a question of who she would rather displease most. While this had always been her parents, and especially her mom, in the past that she tried to keep from upsetting, she decided that this time the person she was going to please the most with her decision was herself.",
  "After hunting for several hours, we finally saw a large seal sunning itself on a flat rock. I took one of the wooden clubs while Larry took the longer one. We slowly snuck up behind the seal until we were close enough to club it over its head. The seal slumped over and died. This seal would help us survive. We could eat the meat and fat. The fat could be burned in a shell for light and the fur could be used to make a blanket. We declared our first day of hunting a great success.",
  "The kids were loud. They were way too loud for Jerry, especially since this was a four-hour flight. The parents didn't seem to be able, or simply didn't want, to control them. They were yelling and fighting among themselves and it was impossible for any of the passengers to concentrate or rest. He thought about politely tapping on the parents' shoulders and asking them to try and get their kids under a bit more control, but before he did he came up with a better idea. Sure, it was a bit sinister, and he'd probably end p in a lot of trouble, but he really didn't care at that point.",
  "There was a time and a place for Stephanie to use her magic. The problem was that she had a difficult time determining this. She wished she could simply use it when the desire hit and there wouldn't be any unforeseen consequences. Unfortunately, that's not how it worked and the consequences could be devastating if she accidentally used her magic at the wrong time.",
  "The spot was perfect for camouflage. At least that's what she thought when she picked the spot. She couldn't imagine that anyone would ever be able to see her in these surroundings. So there she sat, confident that she was hidden from the world and safe from danger. Unfortunately, she had not anticipated that others may be looking upon her from other angles, and now they were stealthily descending toward her hiding spot.",
  "There were a variety of ways to win the game. James had played it long enough to know most of them and he could see what his opponent was trying to do. There was a simple counterattack that James could use and the game should be his. He began deploying it with the confidence of a veteran player who had been in this situation a thousand times in the past. So, it was with great surprise when his opponent used a move he had never before seen or anticipated to easily defeat him in the game.",
  "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
  "As she sat watching the world go by, something caught her eye. It wasn't so much its color or shape, but the way it was moving. She squinted to see if she could better understand what it was and where it was going, but it didn't help. As she continued to stare into the distance, she didn't understand why this uneasiness was building inside her body. She felt like she should get up and run. If only she could make out what it was. At that moment, she comprehended what it was and where it was heading, and she knew her life would never be the same.",
];

let paraSpan = [];

function extendParagraph(index) {
  let allParagraph = "";
  console.log("Extending paragraph...");
  //size += paragraphs[randIndex].split("").length;
  paragraphs[index].split("").forEach((span) => {
    //removing everything except letters
    if (span.toLowerCase() != span.toUpperCase() || span === " ") {
      let spanTag = `<span>${span.toLowerCase()}</span>`;
      allParagraph += spanTag;
    }
  });
  //console.log(allParagraph);
  paraSpan.push(allParagraph);
}

for (let i = 0; i < paragraphs.length; i++) {
  extendParagraph(i);
}

console.log(paraSpan);
