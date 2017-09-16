import { cube } from './math.js';
import printMe from './print.js';
import './styles.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(function(_) {
        var element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;

    }).catch(function(error) { return 'An error occurred while loading the component'});
}

getComponent().then(function(component) {
    document.body.appendChild(component);
});

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.appendChild(element);
    });
}
