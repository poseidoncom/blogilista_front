describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Tuukka Hartikainen',
      username: 'tuukka',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tuukka')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('logged in as a Tuukka Hartikainen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jaakko')
      cy.get('#password').type('salasan')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
  //Cypressin dokumentaation mukaan kirjautuminen pitää testata mutta toistoa ei tarvita -> kirjaudutaan UI:n ohi
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tuukka', password:'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('cypress documentation')
      cy.get('#author').type('sir Cypress III')
      cy.get('#url').type('www.cypress.com')
      cy.contains('add').click()
      cy.contains('new Blog cypress documentation added')
    })

    describe('and a blog exist', function(){

      beforeEach(function(){
        cy.createBlog({
          title: 'blog from cypress',
          author: 'Sir Cypress III',
          url: 'cypress.com'
        })

        cy.createBlog({
          title: 'most liked blog',
          author: 'Sir Cypress II',
          url: 'cypress.fi'
        })
      })

      it('A blog can be liked', function () {
        cy.contains('blog from cypress')
        cy.contains('show').click()
        cy.get('#like-button').click()
        cy.contains('likes: 1')
      })

      it('user who added the blog can delete it', function(){
        cy.contains('blog from cypress')
        cy.contains('show').click()
        cy.get('#remove-button').click()
        cy.contains('blog removed')
      })

      it('blogs are sorted most likes first', function(){
        cy.contains('most liked blog')
        cy.contains('show').click()
        cy.get('#like-button').click()
        cy.get('.blog').eq(0).should('contain', 'most liked blog')
        cy.get('.blog').eq(1).should('contain', 'blog from cypress')

      })

    })

  })

})