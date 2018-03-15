import { create } from '.'
import { MemoryUserDB } from './db'
import { None } from './password'
import { SimpleAccessTokenServer } from './tokens';

create(new MemoryUserDB({
    ci010: {
        id: 'awduaiwh',
        username: 'ci010',
        password: 'pass',
        availableProfiles: [{ id: 'first', name: 'ci010' }],
        properties: {},
    }
}), new SimpleAccessTokenServer(), new None())
    .listen(8080, () => {
        console.log('server started')
    });

