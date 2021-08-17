
// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '9c6ea7e'
/*
[X] step1: "login form is displayed by default"
[X] step2: "login attempts are handled properly"
[X] step3: "logged in user can create blog"
[X] step4: "user can like blog"
[X] step5: "blog creator can delete blog"
[] step6: "blog are sorted by likes"


*/
// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${Cypress.env('SOLUTION') || 'your-solution'} [ ${commitSHA} ]\n`, function () {

/*
  it('expects that true is true', function() { 
    expect(true).to.equal(true) 
  })*/

  describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
        name: "Ned Flanders",
        username: "ned",
        password: "ned"
      }

      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('5.17 Login form is shown', function() {
      cy.contains("log in to application")
      cy.contains("username")
      cy.contains("password")
      cy.contains("login")
    })
  
    describe('Login',function() {
      it('5.18 succeeds with correct credentials', function() {
        cy.get("input[name='username']").type("ned");
			  cy.get("input[name='password']").type("ned");
			  cy.contains("login").click();
			  cy.contains("Ned Flanders is loged in");

      })
  
      it('5.18 fails with wrong credentials', function() {
        cy.get("input[name='username']").type("matti")
			  cy.get("input[name='password']").type("meikainen")
			  cy.contains("login").click();
			  cy.get('h2').contains("wrong username or password")
      })

      })

    describe('5.19 Blog app', function() {
        describe('When logged in', function() {
          beforeEach(function() {
            cy.get("input[name='username']").type("ned");
			      cy.get("input[name='password']").type("ned");
			      cy.contains("login").click();
          })
      
          it('5.19 A blog can be created', function() {
            cy.contains("create new blog").click()
			      cy.get("input[name='title']").type("titleTest")
			      cy.get("input[name='author']").type("authorTest")
			      cy.get("input[name='url']").type("www.testing.com")
            cy.get('form').submit()
            cy.contains('titleTest by authorTest')
          })
        })
    })

    describe("5.20 & 21 When there is a blog", function () {
			beforeEach(function () {
        cy.get("input[name='username']").type("ned");
			  cy.get("input[name='password']").type("ned");
			  cy.contains("login").click();
				cy.contains("create new blog").click();
        cy.get("input[name='title']").type("titleTest");
        cy.get("input[name='author']").type("authorTest");
        cy.get("input[name='url']").type("www.testing.com");
        cy.get('form').submit()
        cy.contains('titleTest by authorTest')

				cy.visit("http://localhost:3000");
			});

			it("5.20 user can like a blog.", function () {
				cy.contains("titleTest by authorTest").find("button").click();
				cy.contains("like").click();
				cy.contains("likes 1");
			});
			it("5.21 a user who created a blog can delete it", function () {
				cy.contains("titleTest by authorTest").find("button").click();
				cy.contains("remove").click();
				cy.get("html").should("not.contain", "titleTest by authorTest");
			})
		})







  })
})