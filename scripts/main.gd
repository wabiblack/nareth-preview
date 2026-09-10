extends Node2D

const WORLD_SIZE := Vector2(1600, 900)
const TILE := 64

var atlas_texture: ImageTexture
var background_layer: Node2D
var world_layer: Node2D

var grass_rects := [
	Rect2(380, 510, 64, 64),
	Rect2(446, 510, 64, 64),
	Rect2(512, 510, 64, 64),
]
var dirt_rects := [
	Rect2(578, 510, 64, 64),
	Rect2(644, 510, 64, 64),
	Rect2(380, 576, 64, 64),
]
var road_points := PackedVector2Array([
	Vector2(-80, 545),
	Vector2(180, 525),
	Vector2(390, 535),
	Vector2(610, 570),
	Vector2(825, 545),
	Vector2(1035, 520),
	Vector2(1260, 535),
	Vector2(1680, 555),
])

func _ready() -> void:
	atlas_texture = _load_atlas_from_web_chunks()
	if atlas_texture == null:
		push_error("NARETH atlas yuklenemedi")
		return
	_build_background()
	_build_karaova()
	_build_player()
	_build_ui()
	print("NARETH native Godot Karaova ready")

func _load_atlas_from_web_chunks() -> ImageTexture:
	var b64 := ""
	for i in range(6):
		var path := "res://art50-%02d.js" % i
		if not FileAccess.file_exists(path):
			push_error("Eksik atlas parcasi: " + path)
			return null
		var txt := FileAccess.get_file_as_string(path)
		var marker := txt.find("+'")
		var finish := txt.rfind("'")
		if marker < 0 or finish <= marker + 2:
			push_error("Atlas parcasi okunamadi: " + path)
			return null
		b64 += txt.substr(marker + 2, finish - marker - 2)
	var raw := Marshalls.base64_to_raw(b64)
	var image := Image.new()
	var err := image.load_png_from_buffer(raw)
	if err != OK:
		push_error("PNG decode hatasi: %s" % err)
		return null
	return ImageTexture.create_from_image(image)

func _build_background() -> void:
	background_layer = Node2D.new()
	background_layer.name = "Terrain"
	add_child(background_layer)

	var base := Polygon2D.new()
	base.name = "GroundBase"
	base.polygon = PackedVector2Array([
		Vector2.ZERO,
		Vector2(WORLD_SIZE.x, 0),
		WORLD_SIZE,
		Vector2(0, WORLD_SIZE.y),
	])
	base.color = Color8(66, 91, 54)
	base.z_index = -40
	background_layer.add_child(base)

	for gy in range(int(ceil(WORLD_SIZE.y / TILE))):
		for gx in range(int(ceil(WORLD_SIZE.x / TILE))):
			var idx := abs(gx * 17 + gy * 29 + gx * gy) % grass_rects.size()
			var tile := _region_sprite(grass_rects[idx], Vector2(gx * TILE + 32, gy * TILE + 32), 1.0)
			tile.centered = true
			tile.offset = Vector2.ZERO
			tile.z_index = -30
			background_layer.add_child(tile)

	var road_border := Line2D.new()
	road_border.name = "RoadBorder"
	road_border.points = road_points
	road_border.width = 132.0
	road_border.default_color = Color8(83, 58, 38)
	road_border.antialiased = false
	road_border.z_index = -20
	background_layer.add_child(road_border)

	var road_base := Line2D.new()
	road_base.name = "RoadBase"
	road_base.points = road_points
	road_base.width = 112.0
	road_base.default_color = Color8(137, 101, 62)
	road_base.antialiased = false
	road_base.z_index = -19
	background_layer.add_child(road_base)

	for gy in range(int(ceil(WORLD_SIZE.y / TILE))):
		for gx in range(int(ceil(WORLD_SIZE.x / TILE))):
			var center := Vector2(gx * TILE + 32, gy * TILE + 32)
			if _distance_to_road(center) < 52.0:
				var idx := abs(gx * 11 + gy * 7) % dirt_rects.size()
				var tile := _region_sprite(dirt_rects[idx], center, 1.0)
				tile.centered = true
				tile.offset = Vector2.ZERO
				tile.z_index = -18
				background_layer.add_child(tile)

func _build_karaova() -> void:
	world_layer = Node2D.new()
	world_layer.name = "Karaova"
	world_layer.y_sort_enabled = true
	add_child(world_layer)

	_add_world_sprite("KaraovaHani", Rect2(0, 0, 365, 307), Vector2(565, 405), 1.08)
	_add_world_sprite("Demirci", Rect2(370, 0, 300, 355), Vector2(1015, 435), 0.88)
	_add_world_sprite("Ev", Rect2(675, 0, 208, 247), Vector2(225, 375), 0.92)
	_add_world_sprite("Pazar", Rect2(0, 360, 245, 249), Vector2(1035, 760), 0.88)
	_add_world_sprite("Kuyu", Rect2(250, 360, 120, 119), Vector2(735, 675), 0.92)

	_add_world_sprite("AgacSol", Rect2(380, 360, 112, 139), Vector2(120, 680), 1.15)
	_add_world_sprite("AgacOrta", Rect2(500, 360, 103, 126), Vector2(790, 360), 0.90)
	_add_world_sprite("AgacSag", Rect2(380, 360, 112, 139), Vector2(1430, 420), 1.10)
	_add_world_sprite("AgacAlt", Rect2(500, 360, 103, 126), Vector2(1370, 790), 1.05)

	_add_world_sprite("Varil", Rect2(0, 615, 88, 86), Vector2(390, 455), 0.80)
	_add_world_sprite("Kasalar", Rect2(92, 615, 120, 86), Vector2(1165, 665), 0.86)
	_add_world_sprite("Araba", Rect2(216, 615, 150, 93), Vector2(1245, 595), 0.88)

	_add_npc("Mira", Rect2(708, 329, 48, 72), Vector2(785, 520), 0.88)
	_add_npc("Daren", Rect2(708, 404, 48, 72), Vector2(1100, 515), 0.88)
	_add_npc("Orik", Rect2(708, 477, 48, 72), Vector2(905, 620), 0.92)
	_add_npc("Varen", Rect2(708, 553, 48, 70), Vector2(455, 525), 0.88)
	_add_npc("Sela", Rect2(708, 626, 48, 72), Vector2(805, 705), 0.88)

	_add_blocker("InnCollision", Vector2(565, 387), Vector2(300, 38))
	_add_blocker("SmithCollision", Vector2(1015, 417), Vector2(220, 42))
	_add_blocker("HomeCollision", Vector2(225, 360), Vector2(150, 34))
	_add_blocker("MarketCollision", Vector2(1035, 744), Vector2(185, 34))
	_add_blocker("WellCollision", Vector2(735, 665), Vector2(75, 28))

func _build_player() -> void:
	var player := CharacterBody2D.new()
	player.name = "Player"
	player.position = Vector2(650, 535)
	player.set_script(load("res://scripts/player.gd"))
	world_layer.add_child(player)

	var shape := CapsuleShape2D.new()
	shape.radius = 9.0
	shape.height = 22.0
	var collision := CollisionShape2D.new()
	collision.name = "CollisionShape2D"
	collision.position = Vector2(0, -9)
	collision.shape = shape
	player.add_child(collision)

	var sprite := _region_sprite(Rect2(708, 252, 48, 74), Vector2.ZERO, 0.90)
	sprite.name = "Sprite"
	sprite.offset = Vector2(0, -37)
	player.add_child(sprite)

	var camera := Camera2D.new()
	camera.name = "Camera2D"
	camera.position = Vector2(0, -140)
	camera.position_smoothing_enabled = true
	camera.position_smoothing_speed = 7.0
	camera.limit_left = 0
	camera.limit_top = 0
	camera.limit_right = int(WORLD_SIZE.x)
	camera.limit_bottom = int(WORLD_SIZE.y)
	player.add_child(camera)

func _build_ui() -> void:
	var ui := CanvasLayer.new()
	ui.name = "UI"
	add_child(ui)

	var panel := Panel.new()
	panel.position = Vector2(22, 20)
	panel.size = Vector2(310, 96)
	var style := StyleBoxFlat.new()
	style.bg_color = Color(0.055, 0.05, 0.043, 0.86)
	style.border_color = Color(0.50, 0.40, 0.27, 0.92)
	style.set_border_width_all(2)
	style.set_corner_radius_all(12)
	panel.add_theme_stylebox_override("panel", style)
	ui.add_child(panel)

	var title := Label.new()
	title.position = Vector2(18, 10)
	title.size = Vector2(270, 38)
	title.text = "NARETH"
	title.add_theme_font_size_override("font_size", 28)
	title.add_theme_color_override("font_color", Color8(238, 213, 171))
	panel.add_child(title)

	var status := Label.new()
	status.position = Vector2(19, 53)
	status.size = Vector2(280, 28)
	status.text = "Karaova • native Godot prototipi"
	status.add_theme_font_size_override("font_size", 15)
	status.add_theme_color_override("font_color", Color8(198, 185, 158))
	panel.add_child(status)

	var hint := Label.new()
	hint.position = Vector2(22, 665)
	hint.size = Vector2(420, 30)
	hint.text = "Hareket: WASD veya yon tuslari"
	hint.add_theme_font_size_override("font_size", 15)
	hint.add_theme_color_override("font_color", Color8(230, 218, 192))
	ui.add_child(hint)

func _region_sprite(rect: Rect2, pos: Vector2, scale_value: float) -> Sprite2D:
	var sprite := Sprite2D.new()
	sprite.texture = atlas_texture
	sprite.region_enabled = true
	sprite.region_rect = rect
	sprite.position = pos
	sprite.scale = Vector2.ONE * scale_value
	sprite.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST
	return sprite

func _add_world_sprite(node_name: String, rect: Rect2, foot: Vector2, scale_value: float) -> Sprite2D:
	var sprite := _region_sprite(rect, foot, scale_value)
	sprite.name = node_name
	sprite.offset = Vector2(0, -rect.size.y / 2.0)
	world_layer.add_child(sprite)
	return sprite

func _add_npc(node_name: String, rect: Rect2, foot: Vector2, scale_value: float) -> void:
	var sprite := _add_world_sprite(node_name, rect, foot, scale_value)
	var label := Label.new()
	label.text = node_name
	label.position = Vector2(-30, -rect.size.y * scale_value - 22)
	label.size = Vector2(60, 20)
	label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	label.add_theme_font_size_override("font_size", 12)
	label.add_theme_color_override("font_color", Color8(239, 215, 174))
	sprite.add_child(label)

func _add_blocker(node_name: String, center: Vector2, size: Vector2) -> void:
	var body := StaticBody2D.new()
	body.name = node_name
	body.position = center
	var shape := RectangleShape2D.new()
	shape.size = size
	var collision := CollisionShape2D.new()
	collision.shape = shape
	body.add_child(collision)
	world_layer.add_child(body)

func _distance_to_road(point: Vector2) -> float:
	var best := INF
	for i in range(road_points.size() - 1):
		best = min(best, _distance_to_segment(point, road_points[i], road_points[i + 1]))
	return best

func _distance_to_segment(point: Vector2, a: Vector2, b: Vector2) -> float:
	var ab := b - a
	var len2 := ab.length_squared()
	if len2 <= 0.0001:
		return point.distance_to(a)
	var t := clamp((point - a).dot(ab) / len2, 0.0, 1.0)
	return point.distance_to(a + ab * t)
