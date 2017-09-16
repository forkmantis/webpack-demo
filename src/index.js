import { cube } from './math.js';
import _ from 'lodash';
import './styles.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    var element = document.createElement('div');

    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML = 'Click me and look at the console';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = function() {
        import(/* webpackChunkName: "print" */ './print').then(
            function(module) {
                var print = module.default;

                print();
            }
        );
    };

    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.appendChild(element);
    });
}
