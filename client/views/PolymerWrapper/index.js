/**
 * PolymerWrapper eases binding event listeners to Polymer Component events,
 * primarily notify ({prop}-changed) events.
 * Since they need to be listened to via addEventListener and
 * ReactPolymer doesn't seem to be able to tell React that it should do this with such events,
 * this class uses a ref helper function to handle this case instead.
 *
 * Usage:
 *  render() {
 *    return (
 *      <some-polymer-element
 *        some-value={this.props.foo}
 *        ref={this.polymerEvents(`somePolymerElement`, {
 *          'some-value-changed': event => {
 *            this.onSomeValueChanged( event.target.value )
 *          }
 *        })}/>
 *    );
 *  }
 *
 * Usage with iterated items:
 *  render() {
 *    return (
 *      <div className="items">
 *        {this.props.someArray.map(someItem => (
 *          <some-polymer-element
 *            key={someItem.id}
 *            some-value={someItem.foo}
 *            ref={this.polymerEvents(`somePolymerElement#${someItem.id}`, {
 *              'some-value-changed': event => {
 *                this.onSomeItemValueChanged(someItem.id, event.target.value)
 *              }
 *            })}/>
 *        ))}
 *      </div>
 *    );
 *  }
 *
 * Note that there's no additional parameters, just that the name is built
 * using some item key, probably the same one you use for the @key attr.
 *
 * Note also that you don't have to use a # in there.  The names are completely arbitrary.
 */

import React from 'react';

export default class PolymerWrapper extends React.Component {
  constructor( props ) {
    super( props );

    this.polymerComponents = new Map();
  }

  polymerEvents( componentName, events ) {
    return ref => {
      let has = key => this.polymerComponents.has( key );
      if( ref && ! has( componentName ) ) {
        this.registerPolymerComponent( componentName, events, ref );
      }
      else if( ! ref && has( componentName ) ) {
        this.unregisterPolymerComponent( componentName, events, ref );
      }
      else if( ref && has( componentName ) ) {
        this.updatePolymerComponent( componentName, events, ref );
      }
    };
  }

  registerPolymerComponent( componentName, events, ref ) {
    this.polymerComponents.set( componentName, {
      ref,
      events
    });

    this.addPolymerEventListeners( componentName, events, ref );
  }

  updatePolymerComponent( componentName, events /*ref*/ ) {
    let componentDef = this.polymerComponents.get( componentName );
    componentDef.events = events;
  }

  unregisterPolymerComponent( componentName, events /*ref*/ ) {
    let componentDef = this.polymerComponents.get( componentName );
    let actualRef = componentDef.ref;

    // TODO: Do we actually need to remove event listeners when an element is being removed?
    this.removePolymerEventListeners( componentName, events, actualRef );
    this.polymerComponents.delete( componentName );
  }

  addPolymerEventListeners( componentName, events, ref ) {
    let componentDef = this.polymerComponents.get( componentName );
    let handlers = componentDef.handlers = componentDef.handlers || {};

    Object.keys( events ).forEach( eventName => {
      handlers[ eventName ] = event => this.dispatchPolymerRefEvent( componentName, eventName, event );
      ref.addEventListener( eventName, handlers[ eventName ] );
    });
  }

  removePolymerEventListeners( componentName, events, ref ) {
    let componentDef = this.polymerComponents.get( componentName );
    let { handlers } = componentDef;

    Object.keys( events ).forEach( eventName => {
      ref.removeEventListener( eventName, handlers[ eventName ] );
    });
  }

  dispatchPolymerRefEvent( componentName, eventName, event ) {
    let componentDef = this.polymerComponents.get( componentName );
    let { events } = componentDef;

    return events[ eventName ]( event );
  }
}
