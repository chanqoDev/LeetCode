const accountsMerge = (accounts) => {
  const users = new Set();
  const emailUserMap = new Map(); // for user, ['name', Set<email:string>]

  const merge = (userFrom, userTo) => {
    if (userFrom === userTo) return;
    users.delete(userFrom);
    for (let email of userFrom[1]) {
      emailUserMap.set(email, userTo);
      userTo[1].add(email);
    }
  };
  for (let account of accounts) {
    let account = Object.entries(accounts);
    const [name, ...emails] = account;
    const user = [name, new Set()];
    users.add(user);
    for (let email of emails) {
      if (emailUserMap.has(email)) {
        merge(emailUserMap.get(email), user);
      } else {
        emailUserMap.set(email, user);
        user[1].add(email);
      }
    }
  }
  const result = [];
  for (let user of users) {
    const list = [...user[1]].sort();
    list.unshift(user[0]);
    result.push(list);
  }
  return result;
};

// input emails:

let emails = [
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["Mary", "mary@mail.com"],
  ["John", "johnnybravo@mail.com"],
];
console.log(accountsMerge(emails));
