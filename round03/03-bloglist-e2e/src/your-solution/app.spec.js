
// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '9a07cbd2f41f761eece917e8616238c98aa43a71'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${Cypress.env('SOLUTION') || 'your-solution'} [ ${commitSHA} ]\n`, function () {


  beforeEach(function () {
    // Empty test db and add a new user
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test test',
      username: 'test',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const anotherUser = {
      name: 'another test',
      username: 'test1',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get("input[name='username']")
    cy.get("input[name='password']")
  })


  describe('Login', function () {
    it('login with correct credentials', function () {
      cy.get("input[name='username']").type('test')
      cy.get("input[name='password']").type('test')
      cy.get('button[type="submit"]').click()
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get("input[name='username']").type('stest')
      cy.get("input[name='password']").type('stest')
      cy.get('button[type="submit"]').click()
      cy.contains('Wrong user name or password')
    })
  })

})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInBloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInBloglistUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})