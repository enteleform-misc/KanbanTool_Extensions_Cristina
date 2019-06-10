//###  Module: CSS  ###//
const cssVariables = require("./__CSS_Variables__.json")

//###  Module  ###//
import {KeyBinding      } from "~/Utils/KeyBinding/__Main__"
import {_CardType       } from "~/Utils/KanbanTool/CardType"
import {set_CSS_Variable} from "~/Utils/CSS_Variables/__Main__"
import {
	CardType_Filter,
	cardTypes,
} from "~/Utils/KanbanTool/__Main__"


//#################//
//###  Exports  ###//
//#################//

export namespace CallbackManager{
	let _entryIndex = -1
	let _card       = undefined

	export function set_Card_HoverCallback(){
		const $element = $("kt-board")

		$element.on("mouseover", "kt-task", (event) => {
			_card = event.currentTarget
		})

		$element.on("mouseout", "kt-task", (event) => {
			_card = null
		})
	}

	export function get_Callbacks(){
		_entryIndex += 1
		const cardType = cardTypes[_entryIndex]

		return _get_Callbacks(cardType)
	}

	function _get_Callbacks(cardType:_CardType){
		return {
			on_Layout: function(cell:JQuery){
				const update_CSS = _get_UpdateCSS_Callback(cell, cardType)
				CardType_Filter.on_Update(update_CSS)
				update_CSS()
			},

			on_KeyBinding: function(event:KeyboardEvent, cell:JQuery){
				_update_CardType(cardType)
			},

			on_Click: function(event:JQuery.ClickEvent, cell:JQuery){
				if(KeyBinding.is_Pressed("ctrl")){
					CardType_Filter.disable_CardTypes()
					CardType_Filter.enable_CardTypes(cardType.index)
				}
				else
					{CardType_Filter.toggle_CardTypes(cardType.index)}
			},
		}
	}

	function _update_CardType(cardType:_CardType){
		if(_card)
			{_card.props.task.save("card_type_id", cardType.id)}
	}

}


//###############//
//###  Utils  ###//
//###############//

function _get_UpdateCSS_Callback(cell:JQuery, cardType:_CardType){
	return () => {
		let alpha

		if(CardType_Filter.cardType_IsEnabled(cardType)){
			cell.addClass   (cssVariables.activeFilter  )
			cell.removeClass(cssVariables.inactiveFilter)
			alpha = "FF"
		}
		else{
			cell.removeClass(cssVariables.activeFilter  )
			cell.addClass   (cssVariables.inactiveFilter)
			alpha = "AA"
		}

		set_CSS_Variable(cell, cssVariables.filterColor, (cardType.bgColor + alpha))
	}
}