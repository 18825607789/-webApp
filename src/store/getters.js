export const msgViewList = state => {
  let res = []
  let friends = state.data.friends;
  state.messageList.forEach((item) => {
    let friendData = friends.find(f => f.username === item.username)
    let unreadNum = 0
    let lastMessaage = {}
    item.list.forEach((msg) => {
      if (msg.read === false) {
        unreadNum++
      }
      lastMessaage = msg
    })
    res.push({
      ...friendData,
      unreadNum,
      lastMessaage
    })
  })
  return res
}