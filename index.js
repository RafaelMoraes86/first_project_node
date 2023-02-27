const { response } = require('express')
const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000
const users = []

app.use(express.json())

const checkUserId = (request, response, next) => {
    const { id } = request.params
       
    const index = users.findIndex(user => user.id === id)
    
    if( index < 0){
      return response.status(404).json({ Error: "User Not Found"})
}
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
  return response.json({ users })
})
app.post('/users', (request, response) => {
  const { name, age } = request.body
  const user = { id:uuid.v4(),name ,age}

  users.push(user)

  return response.status(201).json({ user })
})

app.put('/users/:id', checkUserId, (request, response) => {
  
  const { name, age} = request.body
  const index = request.userIndex
  const id = request.userId

  const updateUser = {id, name, age }
  
  users[index] = updateUser
  
  return response.json({ updateUser })
})

app.delete('/users/:id', checkUserId, (request, response) => {
  const index = request.userIndex
  
    users.splice(index,1)
    return response.status(204).json()
})


app.listen(port, () => {
  console.log(`🚀Server started On port ${port}`)
})