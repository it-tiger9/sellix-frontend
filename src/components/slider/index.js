import React from 'react'
import { Slider, Handles, Tracks, Ticks, Rail } from 'react-compound-slider'
import './style.scss'


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

const Handle = ({ handle: { id, value, percent }, symbol, getHandleProps }) => (
    <div style={{ left: `${percent}%` }} {...getHandleProps(id)}>
        <span>{value}<i>{symbol}</i></span>
    </div>
)

const Track = ({ source: { percent }, target, getTrackProps }) => (
    <div style={{ left: `${percent}%`, width: `${target.percent - percent}%`}} {...getTrackProps()} />
)

const Tick = ({ tick: { percent, value }, count, symbol }) => (
    <div style={{marginLeft: `${-(100 / count) / 2}%`, width: `${100 / count}%`, left: `${percent}%`}}>
        {value + symbol}
    </div>
)


class DataSlider extends React.Component{

    render() {

        const { domain, value, ticks, step, suffix, receiveValue, className } = this.props

        return(
            <div className={"react-compound-slider pl-2 pr-2 " + className || ''}>
                <Slider
                    rootStyle={sliderStyle}
                    domain={domain}
                    step={step || 1}
                    mode={1}
                    values={value}
                    onChange={(value) => receiveValue(value[0])}
                >
                    <Rail>
                        {({ getRailProps }) => (
                            <div style={railStyle} {...getRailProps()} />
                        )}
                    </Rail>
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="react-compound-slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        symbol={suffix || ''}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="react-compound-slider-tracks">
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
                            <div className="react-compound-slider-ticks" >
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