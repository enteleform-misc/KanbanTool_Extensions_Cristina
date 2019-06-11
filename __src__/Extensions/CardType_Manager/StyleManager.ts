//###  Module  ###//
import {_CardOptions     } from "./__Main__"
import {$set_CSS_Variable} from "~/Utils/CSS_Variables/__Main__"
import {CardType         } from "~/Utils/KanbanTool/CardType"
import {
	cardTypes,
	KanbanTool,
	on_PageLoad,
} from "~/Utils/KanbanTool/__Main__"

//###  NPM  ###//
const $:any = require("jquery")


//#################//
//###  Exports  ###//
//#################//

export namespace StyleManager{

	export let _CardType_Options: _CardOptions[]
	export let _CardType_ID_Map:  {[id:number]: CardType}

	export function initialize(cardOptions:_CardOptions[][]){
		StyleManager._CardType_Options =
			(cardOptions === undefined)
			? undefined
			: cardOptions.flatMap(option => option)

		StyleManager._CardType_ID_Map = _build_CardType_ID_Map()

		const callback = ()=>{
			$.find("kt-task").forEach(element=>{
				update_CardStyle(element)
			})
		}

		on_PageLoad(() => {
			callback()
			KanbanTool.tasks.on("change", callback)
		})
	}

	export function update_CardStyle(element:(HTMLElement|JQuery), cardType?:CardType){
		element  = $(element) as JQuery
		cardType = (cardType || _get_CardType(element))

		if(StyleManager._CardType_Options === undefined)
			{_update_CardStyle_From_CardTypes(element, cardType)}
		else
			{_update_CardStyle_From_CardOptions(element, cardType)}
	}

}

//###############//
//###  Utils  ###//
//###############//

function _build_CardType_ID_Map(){
	const idMap: {[id:number]: CardType} = {}
	cardTypes.forEach(cardType => {
		idMap[cardType.id] = cardType
	})
	return idMap
}

function _update_CardStyle_From_CardTypes(element:JQuery, cardType:CardType){
	$set_CSS_Variable(element, "title_BorderColor", cardType.bgColor)
}

function _update_CardStyle_From_CardOptions(element:JQuery, cardType:CardType){
	const cardOptions = _get_CardOptions(element, cardType)

	$set_CSS_Variable(element, "title_BorderColor",     cardOptions.borderColor    )
	$set_CSS_Variable(element, "title_BackgroundColor", cardOptions.backgroundColor)
	$set_CSS_Variable(element, "title_ForegroundColor", cardOptions.foregroundColor)

	if(cardOptions.borderAccentColor){
		$set_CSS_Variable(element, "title_BorderAccentColor", cardOptions.borderAccentColor)
		element.addClass("borderAccent_Enabled")
	}
	else{
		$set_CSS_Variable(element, "title_BorderAccentColor", "#0000")
		element.removeClass("borderAccent_Enabled")
	}
}

function _get_CardType(element:JQuery){
	const taskID      = element.data("task-id")
	const model       = KanbanTool.tasks.stub(taskID)
	const cardType_ID = model.cardType().id
	return StyleManager._CardType_ID_Map[cardType_ID]
}

function _get_CardOptions(element:JQuery, cardType:CardType)
	{return StyleManager._CardType_Options[cardType.index]}
