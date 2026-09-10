extends Node2D

const WORLD_SIZE: Vector2 = Vector2(1600, 900)
const ATLAS_PATH: String = "res://assets/sprites-v49/world-atlas.svg"

var atlas_texture: Texture2D
var background_layer: Node2D
var world_layer: Node2D
var status_label: Label

var road_points: PackedVector2Array = PackedVector2Array([
	Vector2(-80, 560),
	Vector2(180, 545),
	Vector2(420, 555),
	Vector2(650, 590),
	Vector2(880, 565),
	Vector2(1100, 540),
	Vector2(1330, 555),
	Vector2(1680, 575),
])

func _ready() -> void:
	RenderingServer.set_default_clear_color(Color8(42, 53, 39))
	_build_background()
	_build_ui()
	_set_status("Karaova yukleniyor...")

	atlas_texture = load(ATLAS_PATH) as Texture2D
	if atlas_texture == null:
		_set_status("Godot atlas dosyasini yukleyemedi")
		push_error("Atlas yuklenemedi: " + ATLAS_PATH)
		return

	_build_karaova()
	_build_player()
	_set_status("Karaova • Godot sahnesi calisiyor")
	print("NARETH Karaova ready • SVG atlas loaded")

func _build_background() -> void:
	background_layer = Node2D.new()
	background_layer.name = "Terrain"
	background_layer.z_index = -100
	add_child(background_layer)

	var base: Polygon2D = Polygon2D.new()
	base.name = "Ground"
	base.polygon = PackedVector2Array([
		Vector2.ZERO,
		Vector2(WORLD_SIZE.x, 0),
		WORLD_SIZE,
		Vector2(0, WORLD_SIZE.y),
	])
	base.color = Color8(70, 94, 57)
	background_layer.add_child(base)

	# Hafif farkli yesil yamalar. Atlas yerine native Godot zemin kullaniliyor.
	for i: int in range(42):
		var patch: Polygon2D = Polygon2D.new()
		var px: float = float((i * 197 + 83) % 1540) + 30.0
		var py: float = float((i * 113 + 41) % 820) + 35.0
		var w: float = 36.0 + float((i * 17) % 58)
		var h: float = 18.0 + float((i * 11) % 32)
		patch.polygon = PackedVector2Array([
			Vector2(px - w, py), Vector2(px, py - h),
			Vector2(px + w, py), Vector2(px, py + h)
		])
		patch.color = Color(0.20, 0.30, 0.16, 0.22)
		background_layer.add_child(patch)

	var road_edge: Line2D = Line2D.new()
	road_edge.name = "RoadEdge"
	road_edge.points = road_points
	road_edge.width = 104.0
	road_edge.default_color = Color8(83, 62, 42)
	road_edge.antialiased = true
	background_layer.add_child(road_edge)

	var road: Line2D = Line2D.new()
	road.name = "Road"
	road.points = road_points
	road.width = 88.0
	road.default_color = Color8(145, 111, 70)
	road.antialiased = true
	background_layer.add_child(road)

	var road_light: Line2D = Line2D.new()
	road_light.name = "RoadWear"
	road_light.points = road_points
	road_light.width = 48.0
	road_light.default_color = Color(0.67, 0.52, 0.33, 0.38)
	road_light.antialiased = true
	background_layer.add_child(road_light)

func _build_karaova() -> void:
	world_layer = Node2D.new()
	world_layer.name = "Karaova"
	world_layer.y_sort_enabled = true
	add_child(world_layer)

	# world-atlas.svg icindeki gercek parca koordinatlari
	_add_world_sprite("KaraovaHani", Rect2(0, 0, 320, 220), Vector2(570, 430), 1.18)
	_add_world_sprite("Demirci", Rect2(330, 0, 230, 190), Vector2(1060, 435), 1.10)
	_add_world_sprite("Ev", Rect2(570, 0, 190, 150), Vector2(245, 420), 1.12)
	_add_world_sprite("Pazar", Rect2(770, 0, 230, 140), Vector2(1135, 770), 1.05)
	_add_world_sprite("Kuyu", Rect2(105, 250, 96, 84), Vector2(765, 690), 1.05)

	_add_world_sprite("AgacSol", Rect2(0, 240, 96, 112), Vector2(105, 705), 1.28)
	_add_world_sprite("AgacOrta", Rect2(0, 240, 96, 112), Vector2(805, 390), 1.10)
	_add_world_sprite("AgacSag", Rect2(0, 240, 96, 112), Vector2(1450, 470), 1.28)
	_add_world_sprite("AgacAlt", Rect2(0, 240, 96, 112), Vector2(1390, 815), 1.20)

	_add_world_sprite("Varil", Rect2(210, 255, 40, 56), Vector2(390, 485), 1.0)
	_add_world_sprite("Kasa", Rect2(260, 260, 52, 44), Vector2(1215, 690), 1.0)

	_add_npc("Mira", Rect2(434, 240, 48, 72), Vector2(815, 535), 1.0)
	_add_npc("Daren", Rect2(382, 240, 48, 72), Vector2(1140, 520), 1.0)
	_add_npc("Orik", Rect2(590, 240, 48, 72), Vector2(965, 635), 1.0)
	_add_npc("Varen", Rect2(642, 240, 48, 72), Vector2(455, 535), 1.0)
	_add_npc("Sela", Rect2(538, 240, 48, 72), Vector2(845, 745), 1.0)

	_add_blocker("InnCollision", Vector2(570, 415), Vector2(330, 44))
	_add_blocker("SmithCollision", Vector2(1060, 420), Vector2(245, 42))
	_add_blocker("HomeCollision", Vector2(245, 405), Vector2(195, 34))
	_add_blocker("MarketCollision", Vector2(1135, 755), Vector2(235, 30))
	_add_blocker("WellCollision", Vector2(765, 678), Vector2(80, 26))

func _build_player() -> void:
	var player: CharacterBody2D = CharacterBody2D.new()
	player.name = "Player"
	player.position = Vector2(650, 550)
	player.set_script(load("res://scripts/player.gd"))
	world_layer.add_child(player)

	var shape: CapsuleShape2D = CapsuleShape2D.new()
	shape.radius = 9.0
	shape.height = 22.0
	var collision: CollisionShape2D = CollisionShape2D.new()
	collision.name = "CollisionShape2D"
	collision.position = Vector2(0, -10)
	collision.shape = shape
	player.add_child(collision)

	var sprite: Sprite2D = _region_sprite(Rect2(330, 240, 48, 72), Vector2.ZERO, 1.0)
	sprite.name = "Sprite"
	sprite.offset = Vector2(0, -36)
	player.add_child(sprite)

	var camera: Camera2D = Camera2D.new()
	camera.name = "Camera2D"
	camera.position = Vector2(0, -90)
	camera.position_smoothing_enabled = true
	camera.position_smoothing_speed = 8.0
	camera.limit_left = 0
	camera.limit_top = 0
	camera.limit_right = int(WORLD_SIZE.x)
	camera.limit_bottom = int(WORLD_SIZE.y)
	camera.enabled = true
	player.add_child(camera)

func _build_ui() -> void:
	var ui: CanvasLayer = CanvasLayer.new()
	ui.name = "UI"
	add_child(ui)

	var panel: Panel = Panel.new()
	panel.position = Vector2(22, 20)
	panel.size = Vector2(350, 96)
	var style: StyleBoxFlat = StyleBoxFlat.new()
	style.bg_color = Color(0.055, 0.05, 0.043, 0.88)
	style.border_color = Color(0.50, 0.40, 0.27, 0.92)
	style.set_border_width_all(2)
	style.set_corner_radius_all(12)
	panel.add_theme_stylebox_override("panel", style)
	ui.add_child(panel)

	var title: Label = Label.new()
	title.position = Vector2(18, 8)
	title.size = Vector2(300, 38)
	title.text = "NARETH"
	title.add_theme_font_size_override("font_size", 28)
	title.add_theme_color_override("font_color", Color8(238, 213, 171))
	panel.add_child(title)

	status_label = Label.new()
	status_label.position = Vector2(19, 52)
	status_label.size = Vector2(315, 30)
	status_label.add_theme_font_size_override("font_size", 14)
	status_label.add_theme_color_override("font_color", Color8(198, 185, 158))
	panel.add_child(status_label)

	var hint: Label = Label.new()
	hint.position = Vector2(22, 665)
	hint.size = Vector2(420, 30)
	hint.text = "Hareket: WASD veya yon tuslari"
	hint.add_theme_font_size_override("font_size", 15)
	hint.add_theme_color_override("font_color", Color8(230, 218, 192))
	ui.add_child(hint)

func _set_status(text: String) -> void:
	if is_instance_valid(status_label):
		status_label.text = text

func _region_sprite(rect: Rect2, pos: Vector2, scale_value: float) -> Sprite2D:
	var sprite: Sprite2D = Sprite2D.new()
	sprite.texture = atlas_texture
	sprite.region_enabled = true
	sprite.region_rect = rect
	sprite.position = pos
	sprite.scale = Vector2.ONE * scale_value
	sprite.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	return sprite

func _add_world_sprite(node_name: String, rect: Rect2, foot: Vector2, scale_value: float) -> Sprite2D:
	var sprite: Sprite2D = _region_sprite(rect, foot, scale_value)
	sprite.name = node_name
	sprite.offset = Vector2(0, -rect.size.y / 2.0)
	world_layer.add_child(sprite)
	return sprite

func _add_npc(node_name: String, rect: Rect2, foot: Vector2, scale_value: float) -> void:
	var sprite: Sprite2D = _add_world_sprite(node_name, rect, foot, scale_value)
	var label: Label = Label.new()
	label.text = node_name
	label.position = Vector2(-34, -rect.size.y - 23)
	label.size = Vector2(68, 20)
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.add_theme_font_size_override("font_size", 12)
	label.add_theme_color_override("font_color", Color8(239, 215, 174))
	sprite.add_child(label)

func _add_blocker(node_name: String, center: Vector2, size: Vector2) -> void:
	var body: StaticBody2D = StaticBody2D.new()
	body.name = node_name
	body.position = center
	var shape: RectangleShape2D = RectangleShape2D.new()
	shape.size = size
	var collision: CollisionShape2D = CollisionShape2D.new()
	collision.shape = shape
	body.add_child(collision)
	world_layer.add_child(body)
