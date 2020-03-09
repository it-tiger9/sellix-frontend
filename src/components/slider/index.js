import React from 'react'
import { Slider, Handles, Tracks, Ticks, Rail } from 'react-compound-slider'


const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
}
  
const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 5,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
}

class DataSlider extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const Handle = ({handle: { id, value, percent }, getHandleProps}) => {
            return (
                <div
                    style={{
                        left: `${percent}%`,
                        position: 'absolute',
                        marginLeft: -7,
                        marginTop: 15,
                        zIndex: 2,
                        width: 15,
                        height: 15,
                        border: 0,
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        backgroundColor: '#613BEA',
                        color: '#333',
                    }}
                    {...getHandleProps(id)}
                    >
                </div>
            )
        }

        const Track = ({ source, target, getTrackProps }) => {

            return(
                <div
                    style={{
                        position: 'absolute',
                        height: 5,
                        zIndex: 1,
                        marginTop: 20,
                        backgroundColor: '#613BEA',
                        borderRadius: 5,
                        cursor: 'pointer',
                        left: `${source.percent}%`,
                        width: `${target.percent - source.percent}%`,
                    }}
                    {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
                    />
            )
        }

        const Tick = ({ tick, count, symbol }) => {
            return(
                <div>
                    <div
                        style={{
                            position: 'absolute',
                            marginTop: 35,
                            fontSize: 14,
                            textAlign: 'center',
                            marginLeft: `${-(100 / count) / 2}%`,
                            width: `${100 / count}%`,
                            left: `${tick.percent}%`,
                            color: '#A7A5B4',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        {tick.value + symbol}
                    </div>
                </div>
            )
        }

        const {domain, value, ticks, step, suffix, receiveValue} = this.props

        return(
            <div className="hor-slider pl-2 pr-2">
                <Slider
                    rootStyle={sliderStyle}
                    domain={domain}
                    step={step || 1}
                    mode={1}
                    values={value}
                    onChange={(value) => {
                        receiveValue(value[0])
                    }}
                >
                    <Rail>
                    {({ getRailProps }) => (
                        <div style={railStyle} {...getRailProps()} />
                    )}
                    </Rail>
                    <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                        {handles.map(handle => (
                            <Handle
                            key={handle.id}
                            handle={handle}
                            getHandleProps={getHandleProps}
                            />
                        ))}
                        </div>
                    )}
                    </Handles>
                    <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                        {tracks.map(({ id, source, target }) => (
                            <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                            />
                        ))}
                        </div>
                    )}
                    </Tracks>
                    <Ticks values={ticks}>
                        {({ ticks }) => (
                            <div className="slider-ticks" >
                                {ticks.map(tick => (
                                    <Tick key={tick.id} tick={tick} count={ticks.length} symbol={suffix || ''}/>
                                ))}
                            </div>
                        )}
                    </Ticks>
                </Slider>
            </div>
        )
    }   
}


export default DataSlider