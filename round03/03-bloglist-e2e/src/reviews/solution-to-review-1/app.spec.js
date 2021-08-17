
// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '1541c83'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${Cypress.env('SOLUTION') || 'your-solution'} [ ${commitSHA} ]\n`, function () {
  // Using the same credentials as in 00-server/rest/04-post-user-test.rest example.
  const testUser = {
    username: "test-a",
    name: "Test Tester",
    password: "test"
  }
  const API_HOST = "http://localhost:3003"
  beforeEach(() => {
    // Step 1: reset db
    cy.request("POST", `${API_HOST}/api/testing/reset`)
    // Step 2: create user
    cy.request("POST", `${API_HOST}/api/users`, testUser)
    cy.visit("http://localhost:3000")
  })

  it("Step 1: Login form should be shown with username, password, and submit button", () => {
    cy.get("#form__login").find("input[name='username']")
    cy.get("#form__login").find("input[name='password']")
    cy.get("#form__login").find("button").should("have.text", "login")
  })
  
  describe("Step 2: Login", () => {
    it("should succeed with correct credentials", () => {
      cy.get("input[name='username']").type(testUser.username)
      cy.get("input[name='password']").type(testUser.password)
      cy.get("#form__login").find("button").click()

      cy.contains(`${testUser.name} logged in`).find("button").should("have.text", "logout")
    })

    it("should fail with wrong credentials", () => {
      cy.get("input[name='username']").type("tony")
      cy.get("input[name='password']").type("stark")
      cy.get("#form__login").find("button").click()
      
      cy.contains("wrong username or password").should("have.css", "color", "rgb(255, 0, 0)")
      cy.get("#form__login")
    })
  })

  describe("Steps 3-6: When logged in", () => {
    let user = null
    beforeEach(() => {
      // Step 3: user login
      cy.get("input[name='username']").type(testUser.username)
      cy.get("input[name='password']").type(testUser.password)
      cy.get("#form__login").find("button").click()
      cy.contains("blogs").then(() => {
        user = JSON.parse(localStorage.getItem("user"))
      })
    })

    it("Step 3: should add new blog", () => {
      const testData = {
        title: "Sherlock's journeys",
        author: "Unknown",
        url: "https://www.warnerbros.com/movies/sherlock-holmes"
      }

      cy.get("#button__create-new-blog").click()
      cy.get("input[name='title']").type(testData.title)
      cy.get("input[name='author']").type(testData.author)
      cy.get("input[name='url']").type(testData.url)
      cy.get("#form__create-new-blog").find("button[type='submit']").click()

      cy.contains(`a new blog ${testData.title} by ${testData.author}`).should("have.css", "color", "rgb(0, 128, 0)")
      
      // ensures that it is listed
      cy.get(".blog").should("have.text", `${testData.title} ${testData.author} view`)
    })

    it("Step 4: should be able to like a blog", () => {
      // see 00-server/rest/08-post-blog-without-token.rest
      const mockedBlog = {
        title: "test-auth",
        author: "Authorized With Token",
        url: "http://localhost",
        likes: 0
      }
      cy.request({
        method: "POST",
        url: `${API_HOST}/api/blogs`,
        headers: {
          Authorization: `bearer ${user.token}`
        },
        body: mockedBlog,
      })
    
      // Need to refresh the site to get updated listing
      cy.reload()
      cy.get(".blog").find("button.view-blog").click()
      cy.get(".blog").find("button.like-blog").click()
      cy.contains(`You liked a blog ${mockedBlog.title}.`)
      cy.get(".blog").contains("likes 1")
    })

    it("Step 5: User can delete blog they created.", () => {
      // same as in step 4, could be put into a utility function or merge into describe
      const mockedBlog = {
        title: "test-auth",
        author: "Authorized With Token",
        url: "http://localhost",
        likes: 0
      }
      cy.request({
        method: "POST",
        url: `${API_HOST}/api/blogs`,
        headers: {
          Authorization: `bearer ${user.token}`
        },
        body: mockedBlog,
      })
      cy.reload()
      cy.get(".blog").find("button.view-blog").click()
  
      // The real test
      cy.get(".blog").find("button.delete-blog").should("have.text", "remove")
      cy.get(".blog").find("button.delete-blog").click()
      cy.contains(`Blog ${mockedBlog.title} deleted.`)
      cy.get(".blog").should("not.exist")
    })

    it("Step 6: Blog ordering", () => {
      const mockedBlog1 = {
        title: "mock-blog-1",
        author: "Tony",
        url: "http://localhost",
        likes: 0
      }
      const mockedBlog2 = {
        title: "mock-blog-2",
        author: "Steve",
        url: "http://localhost",
        likes: 0
      }
      const mockedBlog3 = {
        title: "mock-blog-3",
        author: "Natasha",
        url: "http://localhost",
        likes: 0
      }
      const mockedBlogs = [mockedBlog1, mockedBlog2, mockedBlog3]
      mockedBlogs.forEach(mockedBlog => {
        cy.request({
          method: "POST",
          url: `${API_HOST}/api/blogs`,
          headers: {
            Authorization: `bearer ${user.token}`
          },
          body: mockedBlog,
        })
      })
      cy.reload()
      // Won't work if two authors have same blog title, but for this exercise doesn't matter
      const blogId1 = `.blog[data-cy='${mockedBlog1.title}']`
      const blogId2 = `.blog[data-cy='${mockedBlog2.title}']`
      const blogId3 = `.blog[data-cy='${mockedBlog3.title}']`

      // Click three times on first blog
      cy.get(blogId1).find("button.view-blog").click()
      cy.get(blogId1).find("button.like-blog").click()
      // The contains assertion will wait it to exist.
      cy.get(blogId1).contains("likes 1")
      cy.get(blogId1).find("button.like-blog").click()
      cy.get(blogId1).contains("likes 2")
      cy.get(blogId1).find("button.like-blog").click()
      cy.get(blogId1).contains("likes 3")

      // Click once for the second blog
      cy.get(blogId2).find("button.view-blog").click()
      cy.get(blogId2).find("button.like-blog").click()
      cy.get(blogId2).contains("likes 1")

      // Click twice on third blog
      cy.get(blogId3).find("button.view-blog").click()
      cy.get(blogId3).find("button.like-blog").click()
      cy.get(blogId3).contains("likes 1")
      cy.get(blogId3).find("button.like-blog").click()
      cy.get(blogId3).contains("likes 2")

      // I think the hint given in the instructions for using .map is too hard and coudn't get it work.
      // This is equivalent assertion.
      const expectedOrder = [mockedBlog1.title, mockedBlog3.title, mockedBlog2.title]
      cy.get(".blog").each((blog, i) => {
        cy.wrap(blog).should("have.attr", "data-cy", expectedOrder[i])
      })
    })
  })
})
