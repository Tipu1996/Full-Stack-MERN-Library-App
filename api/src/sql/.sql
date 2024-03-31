/* drop table */

DROP TABLE users;
DROP TABLE books;

/* create table */

CREATE TABLE users(
    id serial PRIMARY KEY,
    first_name varchar(50) not NULL,
    last_name varchar(50) not NULL,
    email varchar(50) not NULL UNIQUE,
    password varchar(255) CHECK (length(password)>=5) DEFAULT null,
    picture varchar(255) NOT NULL default '/',
    is_admin Boolean NOT NULL DEFAULT false,
    is_verified Boolean NOT NULL DEFAULT false,
    code varchar(8) DEFAULT NULL
);

CREATE TABLE books(
    id serial PRIMARY KEY,
    title varchar(50) not NULL UNIQUE,
    isbn varchar(50) not NULL,
    description varchar(1000) not NULL,
    publisher varchar(50) not NULL,
    authors varchar(25)[] not NULL,
    categories varchar(25)[] not NULL,
    status varchar(10) not NULL default 'available' CHECK(status='available' OR status='borrowed'),
    borrower_id int references books(id),
    publish_date date not NULL,
    borrow_date date default NULL,
    return_date date default NULL
);

/* inserting a google sign in user */

INSERT INTO users (email,first_name,last_name,is_admin,is_verified) values ('tipu.solehria@gmail.com', 'Abdullah', 'Ashfaq', true, true);
INSERT INTO users (email,first_name,last_name,is_admin,is_verified) values ('Amna.Nasir@gmail.com', 'Amna', 'Nasir', true, true);

INSERT INTO books (title, isbn, description, publisher, authors, categories, publish_date) values ('GoT', '53127800789', 'A song of ice and fire', 'RR publs', ARRAY['George RR Martin'], ARRAY['White WALKERS', 'Fiction'], '2005-02-23');
INSERT INTO books (title, isbn, description, publisher, authors, categories, publish_date) values ('1984', '25370532680', 'A dytopian nocel thriller', '!945 publs', ARRAY['George Orvell'], ARRAY['Dystopian'], '1945-03-23');
INSERT INTO books (title, isbn, description, publisher, authors, categories, publish_date) values ('Harry Potter', '23603526899', 'A world of magic', 'Magic publs', ARRAY['JK Rowling'], ARRAY['White WALKERS', 'Fiction', 'Magic'], '1993-12-23');

/* getting all users/books */

SELECT * FROM users;

SELECT * FROM books;

/* lend book */

UPDATE books SET status='borrowed', borrow_date=NOW()::date, borrower_id=2  WHERE id=3;

/* return book */

UPDATE books SET status='available', borrow_date=NULL, return_date=NOW()::date, borrower_id=NULL WHERE id=3;

/* get user/book by id */

SELECT * FROM users WHERE id=1;
SELECT * FROM books WHERE id=1;

/* sign user up with email and password */

INSERT INTO users (email,first_name,last_name, password, code) values ('imran.khan@gmail.com', 'Imran', 'Khan', '12345', 'A/2143ds');

/* verify user */

UPDATE users SET is_verified=true where email='imran.khan@gmail.com';

/* delete/remove user/book */

DELETE FROM users where id=6;
DELETE FROM books where id=4;

/* get books by title */

SELECT * FROM books WHERE title LIKE '%98%';

/* get books by author */

SELECT *, array_to_string(authors, ' ') FROM books WHERE array_to_string(authors, ' ') LIKE '%orge%';

/* get books by categories */

SELECT *, array_to_string(categories, ' ') FROM books WHERE array_to_string(categories, ' ') LIKE '%ict%';

/* get books by ISBN */

SELECT * FROM books WHERE isbn LIKE '%109%';

/* get books by status */

SELECT * FROM books WHERE status LIKE '%rrow%';

/* add authors to book */

UPDATE books SET authors = ARRAY_CAT(authors, ARRAY['Ashfaq', 'Tipu']) WHERE id = 3;

/* remove author from book */

UPDATE books SET authors = ARRAY_REMOVE(authors, 'Ashfaq') WHERE id = 3;

/* Get users with their borrowed books */

SELECT * FROM books JOIN users ON users.id = books.borrower_id;

/* Get the list of borrowed books */

select * from books where borrower_id is not NULL;

/* Get the list of available books */

select * from books where borrower_id is NULL;

/* Get books borrowed by user of id=2 */

SELECT books.title, books.borrow_date, users.first_name, users.last_name, users.email FROM books Join users on users.id = books.borrower_id AND books.borrower_id=2;

/* Get a merged table of books and users */

SELECT * FROM books LEFT JOIN users ON users.id = books.borrower_id;