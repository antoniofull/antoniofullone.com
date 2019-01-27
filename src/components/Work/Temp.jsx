import React from 'react';

const Temp = props => (
    <article className='work--temp'>
        <header>
            <h2>Work</h2>
        </header>
        <p>
            Most of the projects and code are stored in private repositories and protected by DNA.
            A new portfolio with personal and work projects is coming soon. You can have a look at the link
            in the <a href="#about">about</a> section. 
            Here is a list of the major companies I worked for in the last years.
        </p>

        <div className='companies'>
            {
                props.companies.map(company => (
                    <a href={company.link} key={company.id}>
                        <figure>
                            <img src={company.img} alt={company.label} />
                            {/* <figcaption>{company.label}</figcaption> */}
                        </figure>
                    </a>
                ))
            }
        </div>
    </article>
);


export default Temp;
